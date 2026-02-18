"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Form State
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 20 }
    }
  };

  

  return (
    <section 
    id="contact"
      ref={containerRef}
      className="relative w-full min-h-screen mb-8 bg-[#000119] flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* --- GALAXY BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[140px]" />
        
        {/* Animated Background Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center"
      >
        {/* --- HEADER --- */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-violet-400 uppercase mb-4">
            // Get In Touch
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 drop-shadow-[0_0_15px_rgba(107,91,255,0.4)]">
              Digital Future
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-xl mx-auto">
            I’d love to hear from you. Feel free to reach out with project inquiries or just a friendly hello.
          </p>
        </motion.div>

        {/* --- FORM CONTAINER --- */}
        <motion.div 
          variants={itemVariants} 
          className="relative w-full max-w-2xl"
        >
          {/* Subtle Glow behind form */}
          <div className="absolute inset-0 bg-violet-600/10 rounded-[2rem] blur-2xl -z-10" />

          <form 
            onSubmit={handleSubmit}
            className="p-8 md:p-12 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-left space-y-2">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider ml-1">Your Name</label>
                <InputField placeholder="John Doe" type="text" />
              </div>
              <div className="text-left space-y-2">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider ml-1">Email Address</label>
                <InputField placeholder="john@example.com" type="email" />
              </div>
            </div>

            <div className="text-left space-y-2 mb-6">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider ml-1">Subject</label>
              <InputField placeholder="Project Discussion" type="text" />
            </div>

            <div className="text-left space-y-2 mb-8">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider ml-1">Message</label>
              <textarea 
                rows={5}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none hover:border-white/20"
                placeholder="How can I help you?"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={formStatus === "submitting" || formStatus === "success"}
              className={`group relative w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold tracking-wide transition-all duration-300
                ${formStatus === "success" 
                  ? "bg-green-500/20 text-green-400 border border-green-500/40" 
                  : "bg-gradient-to-r from-violet-600 to-[#6B5BFF] text-white shadow-lg shadow-violet-900/20 hover:shadow-violet-600/40 hover:-translate-y-1"}
              `}
            >
              <AnimatePresence mode="wait">
                {formStatus === "idle" && (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.div>
                )}

                {formStatus === "submitting" && (
                  <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Loader2 size={22} className="animate-spin text-white" />
                  </motion.div>
                )}

                {formStatus === "success" && (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span>Message Sent!</span>
                    <CheckCircle2 size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Reusable Input Component
function InputField({ placeholder, type }) {
  return (
    <motion.input 
      whileFocus={{ y: -2 }}
      type={type}
      placeholder={placeholder}
      required
      className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all hover:border-white/20"
    />
  );
}