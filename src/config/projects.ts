import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "debatehub",
    number: "01",
    title: "DebateHub",
    description:
      "A structured debate platform where users can create discussions, contribute supporting or opposing arguments, and engage with different viewpoints.",
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    // Repository URL placeholder (populate when repository is public/available)
    repositoryUrl: "",
    liveUrl: "",
    visualType: "debatehub",
    // Screenshot path in public/images/projects/
    imageSrc: "/images/projects/debatehub.png",
    imageAlt: "DebateHub debate platform interface",
    isPlaceholder: false,
  },
  {
    id: "custom-memory-allocator",
    number: "02",
    title: "Custom Memory Allocator",
    description:
      "A custom memory allocator implemented in C to explore heap management, block metadata, first-fit allocation, memory splitting, coalescing, and reallocation.",
    technologies: [
      "C",
      "Pointers",
      "Dynamic Memory Management",
      "Make",
    ],
    // Repository URL for mrjd-byte/Custom_Memory_Allocater
    repositoryUrl: "https://github.com/mrjd-byte/Custom_Memory_Allocater",
    liveUrl: "",
    visualType: "memory-allocator",
    // Screenshot path in public/images/projects/
    imageSrc: "/images/projects/memory-allocator.png",
    imageAlt: "Custom memory allocator project interface",
    isPlaceholder: false,
  },
  {
    id: "applied-ai-project",
    number: "03",
    title: "Z-Flux - AI Finance Super App",
    description:
      "Z-Flux is a comprehensive AI-powered Finance Super App designed to unify the fragmented landscape of personal finance.",
    technologies: [
      "AI / ML",
      "Distributed Systems",
      "Full-Stack",
    ],
    repositoryUrl: "",
    liveUrl: "",
    visualType: "placeholder",
    // Screenshot path in public/images/projects/
    imageSrc: "/images/projects/project-03.png",
    imageAlt: "Project 03 interface screenshot",
    isPlaceholder: true,
  },
];
