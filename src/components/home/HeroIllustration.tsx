"use client";

import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * Check if WebGL / WebGL2 is supported in the current browser session.
 * Crucial: explicitly release the test context via WEBGL_lose_context
 * so we do not exhaust the browser's limited WebGL context pool (8-16 contexts).
 */
function checkWebGLSupport(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) return false;

    // Release context immediately to prevent leaking contexts
    const loseContextExt = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_lose_context"
    );
    if (loseContextExt) {
      loseContextExt.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * ErrorBoundary for WebGL / Three.js Canvas:
 * If WebGL context creation fails or throws during initialization,
 * catch the error and seamlessly render the static SVG fallback illustration.
 */
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLCanvasErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn(
      "[HeroIllustration] WebGL render error caught by boundary; using static fallback:",
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * ResponsiveCamera:
 * Keeps the entire isometric exploded illustration perfectly framed across all viewport sizes.
 * Scales zoom smoothly on mobile/tablet viewports (< 520px) to prevent scene edge clipping.
 */
function ResponsiveCamera() {
  const { size, camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      // 520px+ width: zoom of 44 frames the complete composition with generous margins.
      // Narrower viewports: scale zoom proportionally so the laptop, sphere, and cube remain visible.
      const targetZoom = Math.min(44, Math.max(26, (size.width / 520) * 44));
      camera.zoom = targetZoom;
      camera.updateProjectionMatrix();
    }
  }, [size.width, size.height, camera]);

  return null;
}

/**
 * CadBox: Box mesh with sharp CAD-style architectural wireframe edges.
 * Shares geometry between the solid mesh and wireframe lines, and disposes
 * both on unmount to prevent GPU memory leaks.
 */
interface CadBoxProps {
  args: [number, number, number];
  color: string;
  edgeColor?: string;
  edgeOpacity?: number;
  roughness?: number;
  metalness?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function CadBox({
  args,
  color,
  edgeColor = "#28251F",
  edgeOpacity = 0.35,
  roughness = 0.7,
  metalness = 0.15,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CadBoxProps) {
  const { boxGeo, edgesGeo } = useMemo(() => {
    const bg = new THREE.BoxGeometry(...args);
    const eg = new THREE.EdgesGeometry(bg);
    return { boxGeo: bg, edgesGeo: eg };
  }, [args[0], args[1], args[2]]);

  useEffect(() => {
    return () => {
      boxGeo.dispose();
      edgesGeo.dispose();
    };
  }, [boxGeo, edgesGeo]);

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow geometry={boxGeo}>
        <meshStandardMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={edgeOpacity}
        />
      </lineSegments>
    </group>
  );
}

/**
 * FloorGrid: Technical isometric floor lines with projection crosshairs.
 * Geometry is properly disposed on unmount.
 */
function FloorGrid() {
  const gridLines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 5;
    const step = 0.6;
    for (let i = -size; i <= size; i += step) {
      // X-aligned
      points.push(new THREE.Vector3(-size, -1.5, i));
      points.push(new THREE.Vector3(size, -1.5, i));
      // Z-aligned
      points.push(new THREE.Vector3(i, -1.5, -size));
      points.push(new THREE.Vector3(i, -1.5, size));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  useEffect(() => {
    return () => {
      gridLines.dispose();
    };
  }, [gridLines]);

  return (
    <lineSegments geometry={gridLines}>
      <lineBasicMaterial color="#28251F" transparent opacity={0.12} />
    </lineSegments>
  );
}

/**
 * MotherboardScene: Exploded circuit board layer with CPU, RAM, and components.
 * Generates custom 2D canvas textures and disposes them on unmount.
 */
function MotherboardScene() {
  // Procedural CPU Heatspreader texture with micro-traces and alignment triangle
  const cpuTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#22201C";
      ctx.fillRect(0, 0, 256, 256);

      ctx.strokeStyle = "#403B32";
      ctx.lineWidth = 3;
      ctx.strokeRect(8, 8, 240, 240);

      ctx.strokeStyle = "#322E27";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(24, 24, 208, 208);

      // Micro trace grid
      ctx.strokeStyle = "#4D463B";
      ctx.lineWidth = 1;
      for (let i = 44; i < 216; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, 44);
        ctx.lineTo(i, 212);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(44, i);
        ctx.lineTo(212, i);
        ctx.stroke();
      }

      // Gold pin index triangle
      ctx.fillStyle = "#B2985D";
      ctx.beginPath();
      ctx.moveTo(12, 12);
      ctx.lineTo(34, 12);
      ctx.lineTo(12, 34);
      ctx.closePath();
      ctx.fill();

      // Technical die inscription
      ctx.font = "bold 15px monospace";
      ctx.fillStyle = "#ABA18F";
      ctx.textAlign = "center";
      ctx.fillText("CS · SILICON // 64B", 128, 134);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Procedural PCB trace texture
  const pcbTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#4F6352"; // Muted sage-green PCB substrate
      ctx.fillRect(0, 0, 512, 512);

      // Bus traces
      ctx.strokeStyle = "#3D4F40";
      ctx.lineWidth = 2;
      for (let i = 40; i < 480; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 20);
        ctx.lineTo(i, 140);
        ctx.lineTo(i + 40, 180);
        ctx.lineTo(i + 40, 320);
        ctx.stroke();
      }

      // Copper solder pads
      ctx.fillStyle = "#8C7B58";
      for (let x = 60; x < 460; x += 40) {
        for (let y = 360; y < 480; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Dispose textures on unmount
  useEffect(() => {
    return () => {
      cpuTexture?.dispose();
      pcbTexture?.dispose();
    };
  }, [cpuTexture, pcbTexture]);

  const { pcbBoxGeo, pcbEdgesGeo } = useMemo(() => {
    const bg = new THREE.BoxGeometry(2.5, 0.12, 2.3);
    const eg = new THREE.EdgesGeometry(bg);
    return { pcbBoxGeo: bg, pcbEdgesGeo: eg };
  }, []);

  const { cpuBoxGeo, cpuEdgesGeo } = useMemo(() => {
    const bg = new THREE.BoxGeometry(0.78, 0.06, 0.78);
    const eg = new THREE.EdgesGeometry(bg);
    return { cpuBoxGeo: bg, cpuEdgesGeo: eg };
  }, []);

  useEffect(() => {
    return () => {
      pcbBoxGeo.dispose();
      pcbEdgesGeo.dispose();
      cpuBoxGeo.dispose();
      cpuEdgesGeo.dispose();
    };
  }, [pcbBoxGeo, pcbEdgesGeo, cpuBoxGeo, cpuEdgesGeo]);

  return (
    <group position={[0.1, -0.38, 0.2]}>
      {/* Sage Green PCB Substrate */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} geometry={pcbBoxGeo}>
        <meshStandardMaterial
          color="#526654"
          map={pcbTexture || undefined}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      {/* PCB CAD Edges */}
      <lineSegments geometry={pcbEdgesGeo}>
        <lineBasicMaterial color="#28251F" transparent opacity={0.4} />
      </lineSegments>

      {/* Gold edge connector pins */}
      <CadBox
        args={[0.06, 0.04, 1.8]}
        color="#A89058"
        position={[-1.24, 0.04, 0]}
        edgeOpacity={0.4}
      />

      {/* CPU Socket */}
      <CadBox
        args={[0.96, 0.05, 0.96]}
        color="#2E2C26"
        position={[0.1, 0.08, 0.1]}
        edgeOpacity={0.4}
      />

      {/* CPU Processor Die with Heatspreader */}
      <group position={[0.1, 0.14, 0.1]}>
        <mesh castShadow receiveShadow geometry={cpuBoxGeo}>
          <meshStandardMaterial
            color="#22201C"
            map={cpuTexture || undefined}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
        <lineSegments geometry={cpuEdgesGeo}>
          <lineBasicMaterial color="#B0A696" transparent opacity={0.5} />
        </lineSegments>
      </group>

      {/* RAM / DIMM Memory Sticks (Upright modules) */}
      <group position={[-0.75, 0.22, 0.2]}>
        {/* Stick 1 */}
        <CadBox
          args={[0.08, 0.36, 0.95]}
          color="#292824"
          edgeOpacity={0.4}
          position={[0, 0, 0]}
        />
        {/* Chips on Stick 1 */}
        <CadBox
          args={[0.11, 0.14, 0.22]}
          color="#1A1916"
          position={[0, 0.02, -0.24]}
        />
        <CadBox
          args={[0.11, 0.14, 0.22]}
          color="#1A1916"
          position={[0, 0.02, 0.24]}
        />

        {/* Stick 2 */}
        <CadBox
          args={[0.08, 0.36, 0.95]}
          color="#292824"
          edgeOpacity={0.4}
          position={[-0.18, 0, 0]}
        />
        <CadBox
          args={[0.11, 0.14, 0.22]}
          color="#1A1916"
          position={[-0.18, 0.02, -0.24]}
        />
        <CadBox
          args={[0.11, 0.14, 0.22]}
          color="#1A1916"
          position={[-0.18, 0.02, 0.24]}
        />
      </group>

      {/* SMD capacitors around CPU */}
      <CadBox
        args={[0.12, 0.06, 0.08]}
        color="#8B7B61"
        position={[0.7, 0.08, -0.2]}
      />
      <CadBox
        args={[0.12, 0.06, 0.08]}
        color="#8B7B61"
        position={[0.7, 0.08, 0.0]}
      />
      <CadBox
        args={[0.12, 0.06, 0.08]}
        color="#8B7B61"
        position={[0.7, 0.08, 0.2]}
      />

      {/* Electrolytic cylinder capacitors */}
      <group position={[0.72, 0.18, 0.65]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.24, 16]} />
          <meshStandardMaterial
            color="#8F8A7E"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </group>
      <group position={[0.92, 0.18, 0.65]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.24, 16]} />
          <meshStandardMaterial
            color="#8F8A7E"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * LaptopScene: Exploded floating laptop with terminal code display and keyboard deck.
 * Textures and geometries are properly disposed on unmount.
 */
function LaptopScene() {
  // Screen canvas texture displaying code
  const screenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Dark graphite screen backdrop
      ctx.fillStyle = "#181714";
      ctx.fillRect(0, 0, 512, 340);

      // Window header
      ctx.fillStyle = "#25231F";
      ctx.fillRect(0, 0, 512, 28);
      ctx.fillStyle = "#5E584E";
      ctx.fillRect(16, 10, 8, 8);
      ctx.fillRect(30, 10, 8, 8);
      ctx.fillRect(44, 10, 8, 8);

      ctx.font = "12px monospace";
      ctx.fillStyle = "#7F8A7A";
      ctx.fillText("sys_engine.rs — main", 66, 18);

      // Code lines
      ctx.font = "13px monospace";
      ctx.fillStyle = "#6F8A6B"; // sage green comment
      ctx.fillText("// Neural synthesis & compute pipeline", 20, 56);

      ctx.fillStyle = "#D6CDBF"; // warm ivory text
      ctx.fillText("pub struct Runtime<T: Compute> {", 20, 84);
      ctx.fillStyle = "#8FA88F"; // sage green token
      ctx.fillText("  engine: Arc<T>,", 38, 108);
      ctx.fillText("  quantum: SystemClock,", 38, 132);
      ctx.fillStyle = "#D6CDBF";
      ctx.fillText("}", 20, 156);

      ctx.fillStyle = "#6F8A6B";
      ctx.fillText("impl<T> Runtime<T> {", 20, 190);
      ctx.fillStyle = "#D6CDBF";
      ctx.fillText("  pub async fn dispatch(&self) -> Result<()> {", 38, 214);
      ctx.fillStyle = "#8FA88F";
      ctx.fillText("    let stream = self.engine.stream().await?;", 56, 238);
      ctx.fillText("    stream.optimize(Optimization::Max);", 56, 262);
      ctx.fillStyle = "#D6CDBF";
      ctx.fillText("    Ok(())", 56, 286);
      ctx.fillText("  }", 38, 310);
      ctx.fillText("}", 20, 332);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Keyboard deck texture with keys and trackpad
  const keyboardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 360;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#282622";
      ctx.fillRect(0, 0, 512, 360);

      // Recessed key basin
      ctx.fillStyle = "#1E1C19";
      ctx.fillRect(28, 24, 456, 212);

      // Key grid
      ctx.fillStyle = "#33312B";
      const rows = 5;
      const cols = 14;
      const keyW = 27;
      const keyH = 34;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.fillRect(36 + c * 32, 30 + r * 41, keyW, keyH);
        }
      }

      // Trackpad
      ctx.strokeStyle = "#444038";
      ctx.lineWidth = 2;
      ctx.strokeRect(180, 252, 152, 88);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Dispose textures on unmount
  useEffect(() => {
    return () => {
      screenTexture?.dispose();
      keyboardTexture?.dispose();
    };
  }, [screenTexture, keyboardTexture]);

  // Geometries for Base, Hinge, and Display Lid
  const {
    kbBoxGeo,
    kbEdgesGeo,
    deckPlaneGeo,
    lidBoxGeo,
    lidEdgesGeo,
    screenPlaneGeo,
    screenEdgesGeo,
    hingeCylGeo,
  } = useMemo(() => {
    const kbBg = new THREE.BoxGeometry(2.4, 0.06, 1.6);
    const kbEg = new THREE.EdgesGeometry(kbBg);
    const deckPg = new THREE.PlaneGeometry(2.3, 1.5);

    const lidBg = new THREE.BoxGeometry(2.4, 1.5, 0.04);
    const lidEg = new THREE.EdgesGeometry(lidBg);
    const scrPg = new THREE.PlaneGeometry(2.28, 1.38);
    const scrEg = new THREE.EdgesGeometry(scrPg);

    const hCyl = new THREE.CylinderGeometry(0.035, 0.035, 2.1, 16);

    return {
      kbBoxGeo: kbBg,
      kbEdgesGeo: kbEg,
      deckPlaneGeo: deckPg,
      lidBoxGeo: lidBg,
      lidEdgesGeo: lidEg,
      screenPlaneGeo: scrPg,
      screenEdgesGeo: scrEg,
      hingeCylGeo: hCyl,
    };
  }, []);

  useEffect(() => {
    return () => {
      kbBoxGeo.dispose();
      kbEdgesGeo.dispose();
      deckPlaneGeo.dispose();
      lidBoxGeo.dispose();
      lidEdgesGeo.dispose();
      screenPlaneGeo.dispose();
      screenEdgesGeo.dispose();
      hingeCylGeo.dispose();
    };
  }, [
    kbBoxGeo,
    kbEdgesGeo,
    deckPlaneGeo,
    lidBoxGeo,
    lidEdgesGeo,
    screenPlaneGeo,
    screenEdgesGeo,
    hingeCylGeo,
  ]);

  return (
    // Laptop Assembly: Base is strictly horizontal (rotations x=0, z=0),
    // yawed slightly (-0.22 rad / ~-12.6 deg) for an optimal 3/4 isometric view
    <group position={[0.2, 1.15, 0.1]} rotation={[0, -0.22, 0]}>
      {/* 1. Flat Horizontal Keyboard Base Chassis */}
      <group position={[0, 0, 0]}>
        {/* Solid graphite base slab */}
        <mesh castShadow receiveShadow geometry={kbBoxGeo}>
          <meshStandardMaterial
            color="#262420"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        {/* Architectural CAD edges */}
        <lineSegments geometry={kbEdgesGeo}>
          <lineBasicMaterial color="#DDD4C4" transparent opacity={0.35} />
        </lineSegments>

        {/* Top Keyboard Deck surface (facing upward, with keys at rear, trackpad at front) */}
        <mesh position={[0, 0.031, 0]} rotation={[-Math.PI / 2, 0, 0]} geometry={deckPlaneGeo}>
          <meshStandardMaterial
            map={keyboardTexture || undefined}
            roughness={0.65}
            metalness={0.15}
          />
        </mesh>
      </group>

      {/* 2. Display Assembly Pivoting at the Rear Hinge */}
      {/* Hinge axis at the rear-top edge: z = -0.8, y = 0.03 */}
      {/* Rotation: -0.32 rad (~ -18.3 deg) tilts the screen upright at ~108 deg open relative to base */}
      <group position={[0, 0.03, -0.8]} rotation={[-0.32, 0, 0]}>
        {/* Cylindrical Hinge Barrel connecting base and display */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} geometry={hingeCylGeo}>
          <meshStandardMaterial
            color="#1F1D19"
            roughness={0.5}
            metalness={0.4}
          />
        </mesh>

        {/* Display Lid Rear Casing (stands upright from hinge y=0 to y=1.5) */}
        <mesh castShadow receiveShadow position={[0, 0.75, -0.02]} geometry={lidBoxGeo}>
          <meshStandardMaterial
            color="#262420"
            roughness={0.65}
            metalness={0.25}
          />
        </mesh>
        <lineSegments position={[0, 0.75, -0.02]} geometry={lidEdgesGeo}>
          <lineBasicMaterial color="#DDD4C4" transparent opacity={0.35} />
        </lineSegments>

        {/* Front-facing Display Screen Surface (faces viewer with subtle sage code lines) */}
        <mesh position={[0, 0.75, 0.002]} geometry={screenPlaneGeo}>
          <meshBasicMaterial map={screenTexture || undefined} />
        </mesh>
        {/* Subtle CAD inner bezel line */}
        <lineSegments position={[0, 0.75, 0.003]} geometry={screenEdgesGeo}>
          <lineBasicMaterial color="#7F8A7A" transparent opacity={0.3} />
        </lineSegments>
      </group>
    </group>
  );
}

/**
 * ExplodedScene: Full 3D composition with animations, wireframes, and mouse tracking.
 * Animation uses performance.now() rather than deprecated THREE.Clock to keep console clean.
 */
function ExplodedScene({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const laptopGroupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const cubeWireRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Clamp delta to prevent extrapolation spikes when returning from inactive/hidden tabs
    const safeDelta = Math.min(delta, 0.1);

    // Subtle mouse parallax damping
    if (rootGroupRef.current) {
      const targetRotY = state.pointer.x * 0.12;
      const targetRotX = -state.pointer.y * 0.08;
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        safeDelta * 2.5
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        safeDelta * 2.5
      );
    }

    // Harmonic floating hover animation
    if (!prefersReducedMotion) {
      const t = performance.now() * 0.001;
      if (laptopGroupRef.current) {
        laptopGroupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
      }
      if (sphereRef.current) {
        sphereRef.current.rotation.y += safeDelta * 0.18;
        sphereRef.current.rotation.x += safeDelta * 0.08;
      }
      if (cubeWireRef.current) {
        cubeWireRef.current.rotation.y += safeDelta * 0.12;
        cubeWireRef.current.rotation.z += safeDelta * 0.06;
      }
    }
  });

  // Vertical guideline projection lines
  const projectionLines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // From laptop to PCB
    points.push(new THREE.Vector3(1.3, 1.15, 0.85));
    points.push(new THREE.Vector3(1.3, -0.38, 0.85));
    // From PCB to foundation slab
    points.push(new THREE.Vector3(-1.1, -0.38, -0.8));
    points.push(new THREE.Vector3(-1.1, -1.35, -0.8));
    // Height measurement vertical ruler
    points.push(new THREE.Vector3(2.4, -1.35, 0.0));
    points.push(new THREE.Vector3(2.4, 1.8, 0.0));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => {
    return () => {
      projectionLines.dispose();
    };
  }, [projectionLines]);

  // Wireframe box for floating cube cage
  const { wireCubeGeo, wireEdgesGeo } = useMemo(() => {
    const bg = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    const eg = new THREE.EdgesGeometry(bg);
    return { wireCubeGeo: bg, wireEdgesGeo: eg };
  }, []);

  useEffect(() => {
    return () => {
      wireCubeGeo.dispose();
      wireEdgesGeo.dispose();
    };
  }, [wireCubeGeo, wireEdgesGeo]);

  return (
    <group ref={rootGroupRef}>
      {/* Floor Isometric Grid */}
      <FloorGrid />

      {/* Projection Guidelines */}
      <lineSegments geometry={projectionLines}>
        <lineDashedMaterial
          color="#28251F"
          dashSize={0.15}
          gapSize={0.1}
          transparent
          opacity={0.3}
        />
      </lineSegments>

      {/* Foundation Stepped Architectural Slabs */}
      {/* Base Foundation Plinth (Warm Ivory Cream) */}
      <CadBox
        args={[4.4, 0.18, 3.8]}
        color="#E8DFD1"
        edgeOpacity={0.35}
        position={[0.2, -1.35, 0.2]}
      />

      {/* Stepped Second Plinth (Graphite / Sage tint) */}
      <CadBox
        args={[3.1, 0.16, 2.7]}
        color="#D9D4C7"
        edgeOpacity={0.35}
        position={[0.5, -1.05, 0.4]}
      />

      {/* Raised side platform */}
      <CadBox
        args={[1.3, 0.22, 1.2]}
        color="#34322C"
        edgeOpacity={0.4}
        position={[-1.2, -1.05, -0.7]}
      />

      {/* Motherboard & Processor layer */}
      <MotherboardScene />

      {/* Floating Exploded Laptop */}
      <group ref={laptopGroupRef}>
        <LaptopScene />
      </group>

      {/* Floating Wireframe Geodesic Sphere on the right */}
      <group position={[2.4, 1.25, -0.2]}>
        <mesh ref={sphereRef}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshBasicMaterial
            wireframe
            color="#28251F"
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      {/* Floating Wireframe Cube Cage with Inner Solid Cube to the upper left */}
      <group ref={cubeWireRef} position={[-1.7, 1.75, -0.5]}>
        {/* Outer wireframe box */}
        <lineSegments geometry={wireEdgesGeo}>
          <lineBasicMaterial color="#28251F" transparent opacity={0.45} />
        </lineSegments>
        {/* Inner solid mini-cube */}
        <CadBox
          args={[0.3, 0.3, 0.3]}
          color="#607361"
          edgeOpacity={0.5}
          position={[0, 0, 0]}
        />
      </group>

      {/* Ground Shadow Receiver */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.48, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 12]} />
        <shadowMaterial transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

/**
 * SvgIllustrationFallback: High-fidelity editorial isometric SVG drawing.
 * Matches the warm cream (#F3EBDD), graphite (#28251F), and muted sage palette.
 * Displays during SSR or if WebGL is unavailable / context lost.
 */
function SvgIllustrationFallback() {
  return (
    <svg
      viewBox="0 0 600 520"
      className="w-full h-full select-none"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Isometric technical exploded view illustration"
    >
      <defs>
        <pattern
          id="isoGrid"
          width="40"
          height="23.094"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 11.547L20 0L40 11.547L20 23.094Z"
            stroke="#28251F"
            strokeWidth="0.5"
            strokeOpacity="0.12"
            fill="none"
          />
        </pattern>
      </defs>

      {/* Isometric Grid Floor */}
      <rect
        x="60"
        y="180"
        width="480"
        height="300"
        fill="url(#isoGrid)"
        opacity="0.9"
      />

      {/* Projection dotted lines */}
      <path
        d="M380 200 L380 370 M190 280 L190 430 M490 140 L490 320"
        stroke="#28251F"
        strokeWidth="1"
        strokeDasharray="3 3"
        strokeOpacity="0.35"
      />

      {/* Base Plinth Layer */}
      <polygon
        points="300,430 460,340 300,260 140,350"
        fill="#E8DFD1"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <polygon
        points="140,350 300,430 300,445 140,365"
        fill="#D6CDBF"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <polygon
        points="300,430 460,340 460,355 300,445"
        fill="#C4BBB0"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* Middle Stepped Slab */}
      <polygon
        points="330,380 440,315 320,250 210,315"
        fill="#DCE1D9"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <polygon
        points="210,315 330,380 330,395 210,330"
        fill="#CBD0C8"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <polygon
        points="330,380 440,315 440,330 330,395"
        fill="#BAC0B7"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* Motherboard (Sage Green PCB) */}
      <polygon
        points="320,330 430,265 310,200 200,265"
        fill="#556957"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <polygon
        points="200,265 320,330 320,340 200,275"
        fill="#445446"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />
      <polygon
        points="320,330 430,265 430,275 320,340"
        fill="#39473A"
        stroke="#28251F"
        strokeWidth="1.2"
        strokeOpacity="0.5"
      />

      {/* CPU Socket & Die */}
      <polygon
        points="315,290 365,260 325,235 275,265"
        fill="#26241F"
        stroke="#B0A696"
        strokeWidth="1.2"
      />
      <polygon
        points="305,282 345,258 317,242 277,266"
        fill="#1E1C18"
        stroke="#7A7264"
        strokeWidth="0.8"
      />
      {/* Gold Pin Marker */}
      <polygon points="278,266 288,260 284,268" fill="#B2985D" />

      {/* RAM Modules */}
      <polygon
        points="235,268 245,262 245,242 235,248"
        fill="#252420"
        stroke="#28251F"
        strokeWidth="0.8"
      />
      <polygon
        points="248,260 258,254 258,234 248,240"
        fill="#252420"
        stroke="#28251F"
        strokeWidth="0.8"
      />

      {/* Laptop Keyboard Base */}
      <polygon
        points="340,240 450,175 350,120 240,185"
        fill="#2A2824"
        stroke="#DDD4C4"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <polygon
        points="240,185 340,240 340,248 240,193"
        fill="#1C1B18"
        stroke="#DDD4C4"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      <polygon
        points="340,240 450,175 450,183 340,248"
        fill="#181715"
        stroke="#DDD4C4"
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />

      {/* Laptop Screen (Lid tilted open) */}
      <polygon
        points="350,120 450,175 450,75 350,20"
        fill="#22201C"
        stroke="#DDD4C4"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      {/* Screen Display Face */}
      <polygon
        points="356,115 444,168 444,80 356,28"
        fill="#161513"
        stroke="#33312B"
        strokeWidth="0.8"
      />
      {/* Simulated Code Lines on Display */}
      <path
        d="M366 45 L410 70 M366 58 L425 90 M374 72 L430 102 M374 85 L415 107 M366 100 L420 130 M374 114 L435 147"
        stroke="#7A9A7A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Wireframe Sphere on the right */}
      <g transform="translate(470, 160)" opacity="0.4">
        <circle
          cx="0"
          cy="0"
          r="38"
          stroke="#28251F"
          strokeWidth="0.8"
          fill="none"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="38"
          ry="14"
          stroke="#28251F"
          strokeWidth="0.8"
          fill="none"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="14"
          ry="38"
          stroke="#28251F"
          strokeWidth="0.8"
          fill="none"
        />
        <line
          x1="-38"
          y1="0"
          x2="38"
          y2="0"
          stroke="#28251F"
          strokeWidth="0.8"
        />
        <line
          x1="0"
          y1="-38"
          x2="0"
          y2="38"
          stroke="#28251F"
          strokeWidth="0.8"
        />
      </g>

      {/* Floating Wireframe Cube to the upper left */}
      <g transform="translate(180, 130)">
        {/* Outer cube wireframe */}
        <polygon
          points="0,20 25,5 50,20 25,35"
          fill="none"
          stroke="#28251F"
          strokeWidth="1"
          strokeOpacity="0.45"
        />
        <polygon
          points="0,20 0,45 25,60 25,35"
          fill="none"
          stroke="#28251F"
          strokeWidth="1"
          strokeOpacity="0.45"
        />
        <polygon
          points="50,20 50,45 25,60 25,35"
          fill="none"
          stroke="#28251F"
          strokeWidth="1"
          strokeOpacity="0.45"
        />
        {/* Inner solid mini-cube */}
        <polygon points="25,30 33,25 41,30 33,35" fill="#5F7360" />
        <polygon points="25,30 25,38 33,43 33,35" fill="#4C5C4D" />
        <polygon points="41,30 41,38 33,43 33,35" fill="#3D4A3E" />
      </g>

      {/* Hairline Crosshairs (+) */}
      <path
        d="M120 180 V188 M116 184 H124 M480 390 V398 M476 394 H484 M280 100 V108 M276 104 H284"
        stroke="#28251F"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

/**
 * Main HeroIllustration Component:
 * Embeds the 3D Canvas, technical annotation callouts, and fallback handling.
 *
 * Guarantees explicit responsive container sizing and clean lifecycle management
 * to eliminate intermittent rendering.
 */
export default function HeroIllustration() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGLSupport());

    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches);

      if (mq.addEventListener) {
        mq.addEventListener("change", listener);
        return () => mq.removeEventListener("change", listener);
      } else if (typeof (mq as unknown as { addListener: (l: (e: MediaQueryListEvent) => void) => void }).addListener === "function") {
        (mq as unknown as { addListener: (l: (e: MediaQueryListEvent) => void) => void }).addListener(listener);
        return () => {
          (mq as unknown as { removeListener: (l: (e: MediaQueryListEvent) => void) => void }).removeListener(listener);
        };
      }
    }
  }, []);

  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-square min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] max-w-[560px] mx-auto select-none"
      aria-label="3D architectural computer-system illustration"
    >
      {/* Technical Annotation Callouts (Editorial Notebook Style) */}

      {/* 1. Upper-left Callout Box */}
      <div className="absolute top-2 left-0 sm:left-4 z-10 border border-[#28251F]/25 bg-[#F3EBDD]/90 backdrop-blur-xs px-2.5 py-2 font-mono text-[9px] sm:text-[10px] leading-tight tracking-[0.16em] uppercase text-[#28251F]/80 pointer-events-none text-left">
        <div>IDEAS</div>
        <div>SYSTEMS</div>
        <div>PEOPLE</div>
        <div>IMPACT</div>
      </div>

      {/* 2. Top-right Technical Category Listing */}
      <div className="absolute top-2 right-0 sm:right-4 z-10 border border-[#28251F]/25 bg-[#F3EBDD]/90 backdrop-blur-xs px-2.5 py-2 font-mono text-[9px] sm:text-[10px] leading-tight tracking-[0.16em] uppercase text-[#28251F]/80 text-right pointer-events-none">
        <div>ALGORITHMS</div>
        <div>SYSTEM DESIGN</div>
        <div>FULL-STACK</div>
        <div>AI / ML</div>
        <div className="text-[#28251F]/40">...</div>
      </div>

      {/* 3. Lower-left Code Comment Annotation */}
      <div className="absolute bottom-6 left-0 sm:left-4 z-10 border border-[#28251F]/25 bg-[#F3EBDD]/90 backdrop-blur-xs px-2.5 py-2 font-mono text-[9px] sm:text-[10px] leading-tight tracking-[0.16em] uppercase text-[#28251F]/80 pointer-events-none text-left">
        <div className="text-[#6B7C69]">//</div>
        <div>BUILD</div>
        <div>LEARN</div>
        <div>ITERATE</div>
        <div>REPEAT</div>
      </div>

      {/* 4. Lower-right Callout Box */}
      <div className="absolute bottom-6 right-0 sm:right-4 z-10 border border-[#28251F]/25 bg-[#F3EBDD]/90 backdrop-blur-xs px-2.5 py-2 font-mono text-[9px] sm:text-[10px] leading-tight tracking-[0.16em] uppercase text-[#28251F]/80 pointer-events-none text-left">
        <div>BETTER</div>
        <div>TOOLS</div>
        <div>BRIGHTER</div>
        <div>PROBLEMS.</div>
      </div>

      {/* Central 3D Canvas / WebGL Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {mounted && hasWebGL ? (
          <WebGLCanvasErrorBoundary fallback={<SvgIllustrationFallback />}>
            <Canvas
              orthographic
              camera={{
                position: [12, 10, 12],
                zoom: 44,
                near: -50,
                far: 100,
              }}
              shadows={{ type: THREE.PCFShadowMap }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
              className="w-full h-full block cursor-grab active:cursor-grabbing"
              onCreated={({ gl, camera }) => {
                camera.lookAt(0, 0, 0);
                // Gracefully fallback to SVG if WebGL context is lost during session
                gl.domElement.addEventListener("webglcontextlost", (event) => {
                  event.preventDefault();
                  console.warn("[HeroIllustration] WebGL context lost; falling back to static illustration");
                  setHasWebGL(false);
                });
              }}
            >
              {/* Responsive Camera framing across viewport sizes */}
              <ResponsiveCamera />

              {/* Editorial Lighting */}
              <ambientLight intensity={1.1} color="#F6EFE5" />
              <directionalLight
                position={[10, 15, 8]}
                intensity={1.35}
                color="#FFFDF9"
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={40}
                shadow-camera-left={-6}
                shadow-camera-right={6}
                shadow-camera-top={6}
                shadow-camera-bottom={-6}
              />
              {/* Muted Sage Fill Light */}
              <directionalLight
                position={[-8, 6, -8]}
                intensity={0.45}
                color="#8CA38D"
              />

              {/* 3D Exploded Scene */}
              <ExplodedScene prefersReducedMotion={prefersReducedMotion} />
            </Canvas>
          </WebGLCanvasErrorBoundary>
        ) : (
          /* High-Fidelity SVG Fallback during SSR or when WebGL is unavailable */
          <SvgIllustrationFallback />
        )}
      </div>
    </div>
  );
}

export { HeroIllustration };
