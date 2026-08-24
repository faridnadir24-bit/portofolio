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
import { CommandPalette } from './components/CommandPalette';
import { CvModal } from './components/CvModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import { Command, FileText } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle URL hash changes for deep linking to project prototypes (e.g. #avo-bio-demo)
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      // Strict regex sanitization against DOM-based XSS
      const cleanHash = rawHash.replace(/[^a-zA-Z0-9-_]/g, '');
      if (!cleanHash) return;

      const matchedProject = PROJECTS.find(p => p.slug === cleanHash || p.id === cleanHash);
      if (matchedProject) {
        setSelectedProject(matchedProject);
      } else {
        const element = document.getElementById(cleanHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update active section & scroll progress bar
  useEffect(() => {
    const sections = ['hero', 'tentang', 'proyek', 'keahlian', 'pengalaman', 'kontak'];
    
    const handleScroll = () => {
      // 1. Reading Progress Calculation
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }

      // 2. Active Section Spy
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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <div className="min-h-screen flex flex-col bg-[#FDF9F3] text-[#2A2A3C] relative selection:bg-[#6C7CE0]/20 selection:text-[#5868CA]">
      
      {/* 1. Dynamic Scroll Reading Progress Bar (Top) */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6C7CE0] via-[#8E7FE8] to-[#B48CE0] z-50 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 2. Tactile Subtle Paper Grain Overlay (Removes generic AI flat look) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.022] -z-10 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
        aria-hidden="true"
      />

      {/* Top Navbar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenCv={() => setIsCvModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onNavigate={handleNavigate} 
          onOpenProject={handleOpenProject} 
          onOpenCv={() => setIsCvModalOpen(true)}
        />

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

      {/* Floating Bottom Action Trigger (Ctrl+K Pill) */}
      <aside aria-label="Aksi Cepat" className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={() => setIsCvModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-white text-stone-700 border border-stone-200/90 shadow-md hover:shadow-lg hover:border-[#6C7CE0] hover:text-[#6C7CE0] transition-all duration-200 active:scale-95"
          title="Buka Ringkasan CV"
        >
          <FileText className="w-3.5 h-3.5 text-[#6C7CE0]" />
          <span>Resume</span>
        </button>

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#2A2A3C] text-white shadow-lg hover:shadow-xl hover:bg-stone-800 transition-all duration-200 active:scale-95 group"
          title="Menu Aksi Cepat (Ctrl + K)"
        >
          <Command className="w-3.5 h-3.5 text-[#6C7CE0] group-hover:scale-110 transition-transform" />
          <span>Quick Actions</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-stone-200 ml-0.5">
            ⌘K
          </kbd>
        </button>
      </aside>

      {/* Interactive Project Prototype Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProject}
        />
      )}

      {/* Command Palette (Ctrl + K) Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenProject={handleOpenProject}
        onOpenCv={() => setIsCvModalOpen(true)}
      />

      {/* Interactive Resume / CV Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}
