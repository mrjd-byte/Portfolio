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
    // Optional screenshot path from public/images/projects/ (e.g. "/images/projects/debatehub.png")
    // When left empty, the fallback architectural illustration is rendered
    imageSrc: "",
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
    // Optional screenshot path from public/images/projects/ (e.g. "/images/projects/allocator.png")
    imageSrc: "",
    isPlaceholder: false,
  },
  {
    id: "applied-ai-project",
    number: "03",
    title: "Project 03 — In Development",
    description:
      "A configurable placeholder for an upcoming AI/ML or full-stack software project. System architecture, algorithms, and technical benchmarks will be published upon initial release.",
    technologies: [
      "AI / ML",
      "Distributed Systems",
      "Full-Stack",
    ],
    repositoryUrl: "",
    liveUrl: "",
    visualType: "placeholder",
    // Optional screenshot path from public/images/projects/
    imageSrc: "",
    isPlaceholder: true,
  },
];
