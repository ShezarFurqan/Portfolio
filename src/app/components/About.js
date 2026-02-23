"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Globe, Cpu, Database, Layout, Sparkles, Server, Box } from "lucide-react";

// Updated profiles array
const profiles = [
  {
    id: 1,
    name: "Shezar",
    role: "Full Stack Developer",
    location: "Pakistan",
    image: "/image.png",
    isOpenToWork: true,
    highlightText: "Digital Universes",
    description: "I bridge the gap between design and engineering. With a focus on clean code and aesthetic UI, I build web applications that are both functional and immersive. Every detail matters, from smooth interactions to robust architecture, ensuring apps that feel seamless and professional.",
    techStack: [
      { name: "React", icon: Code2, color: "text-blue-400" },
      { name: "Next.js", icon: Globe, color: "text-white" },
      { name: "Tailwind", icon: Layout, color: "text-cyan-400" },
      { name: "Node.js", icon: Database, color: "text-green-500" },
      { name: "Express.js", icon: Server, color: "text-gray-400" },
      { name: "Framer Motion", icon: Sparkles, color: "text-pink-500" },
      { name: "Firebase", icon: Cpu, color: "text-yellow-500" },
    ]
  },
  {
    id: 2,
    name: "Mohammad Haseeb",
    role: "Full Stack Developer", // Updated role
    location: "Pakistan",
    image: "/blank.jpeg", 
    isOpenToWork: true,
    highlightText: "Scalable Systems",
    description: "I specialize in building full-stack applications with a focus on high performance and seamless user journeys. By combining modern backend efficiency with interactive frontend animations, I create digital solutions that are powerful, secure, and visually stunning.",
    techStack: [
      { name: "MongoDB", icon: Database, color: "text-green-400" }, // Added MongoDB
      { name: "Node.js", icon: Server, color: "text-green-500" },
      { name: "React", icon: Code2, color: "text-blue-400" },
      { name: "GSAP", icon: Sparkles, color: "text-green-300" }, // Added GSAP
      { name: "Next.js", icon: Globe, color: "text-white" },
      { name: "Tailwind", icon: Layout, color: "text-cyan-400" },
      { name: "Express.js", icon: Box, color: "text-gray-300" },
    ]
  }
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutMe() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 10000); // 10 seconds slide time
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden bg-[#000119] flex flex-col items-center justify-center py-20 px-4 sm:px-8 md:px-12">

      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen" />

        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -50, 0], 
              opacity: [0.2, 0.6, 0.2], 
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut", 
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">

          {/* Left Side: Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group flex justify-center lg:justify-start"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 transform scale-90 group-hover:scale-105" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.1)] bg-black/50"
              >
                <div className="absolute inset-0 z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src={profiles[currentIndex].image}
                  alt={`${profiles[currentIndex].name} Profile`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </motion.div>
            </AnimatePresence>

            {profiles[currentIndex].isOpenToWork && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="absolute -bottom-5 -right-2 sm:-right-6 md:right-4 bg-[#000119]/90 backdrop-blur-md border border-violet-500/30 px-5 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-gray-200 text-sm font-medium">Open to work</span>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side: Text & Tech Stack Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start w-full"
            >
              <motion.div variants={variants} initial="hidden" animate="visible">
                <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-violet-400 uppercase mb-3">
                  // About Us
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                  Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 animate-gradient-x">{profiles[currentIndex].highlightText}</span>
                </h1>
              </motion.div>

              <motion.h3
                variants={variants} initial="hidden" animate="visible"
                className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light"
              >
                Hi! I'm <span className="font-semibold text-white">{profiles[currentIndex].name}</span> — {profiles[currentIndex].role} from {profiles[currentIndex].location}.
              </motion.h3>

              <motion.p
                variants={variants} initial="hidden" animate="visible"
                className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl"
              >
                {profiles[currentIndex].description}
              </motion.p>

              <motion.div
                variants={variants} initial="hidden" animate="visible"
                className="pt-4 w-full"
              >
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {profiles[currentIndex].techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.15)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors cursor-pointer group shadow-sm"
                    >
                      <tech.icon size={16} className={`${tech.color} transition-transform duration-300 group-hover:scale-110`} />
                      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12 z-20 relative">
          {profiles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-violet-500 w-8" : "bg-white/20 w-2 hover:bg-white/40"
              }`}
              aria-label={`View profile ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}