"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiFirebase, SiFramer, SiGreensock } from "react-icons/si";

// --- 1. DATA CONFIGURATION ---
const projects = [
  {
    id: 1,
    title: "Scarpa",
    category: "E-commerce",
    description: "Scarpa is a modern online shoe store built with Next.js, Firebase, and Tailwind CSS. It offers a seamless shopping experience with product customization, wishlist, order tracking, and multiple payment options.",
    image: "/scarpa.png", // tum apni actual image dal dena
    tech: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
    links: {
      demo: "https://rockclimb.vercel.app/",   
      github: "#", 
    },
  }

];

// --- 2. CARD COMPONENT ---
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-[#6B5BFF]/50 hover:shadow-[0_0_50px_rgba(107,91,255,0.15)]"
    >
      {/* 2.1 Animated Gradient Border/Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B5BFF]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* 2.2 Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000119] via-[#000119]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

        {/* The Image itself */}
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700"
        />

        {/* Category Badge (Floating) */}
        <div className="absolute top-4 right-4 z-20 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-[#6B5BFF] backdrop-blur-md">
          {project.category}
        </div>
      </div>

      {/* 2.3 Content Section */}
      <div className="relative z-20 flex flex-grow flex-col p-6 -mt-10">
        <h3 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-[#6B5BFF]">
          {project.title}
        </h3>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
          {project.description}
        </p>

        {/* 2.4 Tech Stack (Mini Skills Logic) */}
        <div className="mt-auto mb-6 flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-gray-300 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              <tech.icon style={{ color: tech.color }} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* 2.5 Action Buttons */}
        <div className="flex gap-4 border-t border-white/10 pt-6">
          <motion.a
            href={project.links.demo}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6B5BFF] to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40"
          >
            <FiExternalLink /> Live Demo
          </motion.a>

          <motion.a
            href={project.links.github}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            <FiGithub /> Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. MAIN SECTION ---
export default function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const totalProjects = projects.length;

  // Ref for section title animation
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 2, totalProjects));
  };

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#000119] px-6 py-24 md:px-12">

      {/* 3.1 GALAXY BACKGROUND (Matches your About/Skills) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Gradient Blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6B5BFF]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />

        {/* Star Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
            }}
          />
        ))}
      </div>

      {/* 3.2 SECTION HEADER */}
      <div className="relative z-10 mx-auto max-w-7xl mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold tracking-widest text-[#6B5BFF] uppercase mb-3">
            // My Projects
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B5BFF] to-purple-400">Projects</span>
          </h3>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg font-light">
            A collection of digital experiences crafted with precision, exploring the boundaries of design and functionality.
          </p>
        </motion.div>
      </div>

      {/* 3.3 PROJECTS GRID */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.slice(0, visibleProjects).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 3.4 SHOW MORE BUTTON */}
        {visibleProjects < totalProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex justify-center"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 rounded-full border border-[#6B5BFF]/30 bg-[#6B5BFF]/5 px-8 py-3 text-[#6B5BFF] backdrop-blur-sm transition-all hover:bg-[#6B5BFF] hover:text-white"
            >
              <span className="font-medium">View More Projects</span>
              <div className="absolute inset-0 rounded-full bg-[#6B5BFF] blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}