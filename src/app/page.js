"use client"
import { useContext } from "react";
import { PortContext } from "./context/portContext";
import Navbar from "./components/Navbar";
import ModernHero from "./components/Hero";
import AboutMe from "./components/About";
import SkillsSection from "./components/Skills";
import ProjectsSection from "./components/Projects";
import ConnectSection from "./components/Socials";
import ContactSection from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const {name} = useContext(PortContext)
  return (
    <div>
      <Navbar/>
      <ModernHero/>
      <AboutMe/>
      <SkillsSection/>
      <ProjectsSection/>
      <ConnectSection/>
      {/* <ContactSection/> */}
      <Footer/>
    </div>
  );
}
