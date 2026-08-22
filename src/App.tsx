/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handle URL hash changes for deep linking to project prototypes (e.g. #avo-bio-demo)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      const matchedProject = PROJECTS.find(p => p.slug === hash || p.id === hash);
      if (matchedProject) {
        setSelectedProject(matchedProject);
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const sections = ['hero', 'tentang', 'proyek', 'keahlian', 'pengalaman', 'kontak'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleOpenProject = (projectId: string) => {
    const proj = PROJECTS.find(p => p.id === projectId || p.slug === projectId);
    if (proj) {
      setSelectedProject(proj);
      window.history.pushState(null, '', `#${proj.slug}`);
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF9F3] text-[#2A2A3C]">
      {/* Top Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onNavigate={handleNavigate} onOpenProject={handleOpenProject} />

        {/* 2. Tentang Saya */}
        <About />

        {/* 3. Proyek */}
        <Projects onOpenProject={handleOpenProject} />

        {/* 4. Keahlian Teknis */}
        <Skills />

        {/* 5. Pendidikan & Pengalaman */}
        <Experience />

        {/* 6. Kontak */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Project Prototype Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
}
