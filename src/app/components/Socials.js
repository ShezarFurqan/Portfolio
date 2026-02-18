"use client";
import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDiscord
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

// --- Social Data ---
const socialLinks = [
  {
    name: "GitHub",
    handle: "Shezar Furqan",
    url: "https://github.com/ShezarFurqan",
    icon: <FaGithub />,
    color: "#ffffff", // White glow
    gradient: "from-gray-600 to-gray-900"
  },
  {
    name: "LinkedIn",
    handle: "Shezar Furqan",
    url: "https://www.linkedin.com/in/shezarfurqan/",
    icon: <FaLinkedinIn />,
    color: "#0A66C2", // LinkedIn Blue
    gradient: "from-blue-600 to-blue-900"
  },
  {
    name: "Discord",
    handle: "Render Stack", // apna Discord tag yahan
    url: "https://discord.gg/ZcEpPKCMXF", // ya invite link
    icon: <FaDiscord />,
    color: "#5865F2", // Discord Blue
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    name: "Instagram",
    handle: "shezar.____x59",
    url: "https://www.instagram.com/shezar.____x59/",
    icon: <FaInstagram />,
    color: "#E1306C", // Insta Pink
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "YouTube",
    handle: "Shezar Furqan",
    url: "https://www.youtube.com/@shezar_dev",
    icon: <FaYoutube />,
    color: "#FF0000", // YouTube Red
    gradient: "from-red-500 to-orange-500"
  },
  {
    name: "Email",
    handle: "shezarfurqan@gmail.com",
    url: "/",
    icon: <SiGmail />,
    color: "#EA4335", // Google Red
    gradient: "from-red-500 to-yellow-500"
  }
];

export default function ConnectSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    },
  };

  return (
    <section
      id="social"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#000119] flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* --- 1. GALAXY BACKGROUND (Consistent with other sections) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central Nebula - Purple/Blue mix */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#6B5BFF]/10 via-purple-900/10 to-blue-900/10 rounded-full blur-[120px] animate-pulse" />

        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* --- 2. HEADER CONTENT --- */}
      <div className="relative z-10 text-center mb-16 max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-bold tracking-[0.3em] text-violet-400 uppercase mb-4"
        >
          // Network
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 drop-shadow-[0_0_10px_rgba(107,91,255,0.5)]">With Me</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg font-light"
        >
          Follow my journey, see my code, or just say hi.
          <br className="hidden md:block" /> Let's build something amazing together.
        </motion.p>
      </div>

      {/* --- 3. SOCIAL GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {socialLinks.map((social, index) => (
          <SocialCard key={index} social={social} variants={itemVariants} />
        ))}
      </motion.div>
    </section>
  );
}

// --- SUB-COMPONENT: 3D TILT CARD ---
function SocialCard({ social, variants }) {
  // Mouse position logic for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * width); // Amplify for effect
    y.set(yPct * height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      variants={variants}
      style={{
        perspective: 1000,
      }}
      className="w-full h-full"
    >
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden cursor-pointer transition-colors duration-500 hover:border-white/30"
      >
        {/* HOVER GLOW BACKGROUND */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${social.color}, transparent 70%)`
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 flex items-center gap-4 transform translate-z-20">
          {/* Icon Box */}
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/50 border border-white/10 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            style={{ color: social.color }} // Dynamic Color
          >
            {social.icon}
          </div>

          {/* Text Info */}
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              {social.name}
            </span>
            <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">
              {social.handle}
            </span>
          </div>
        </div>

        {/* ARROW ICON (Slides in on hover) */}
        <div className="relative z-10 transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>

        {/* NEON BORDER EFFECT (Bottom Line) */}
        <div
          className="absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          style={{ backgroundColor: social.color, boxShadow: `0 0 10px ${social.color}` }}
        />
      </motion.a>
    </motion.div>
  );
}