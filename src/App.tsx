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
    const ALLOWED_SECTION_IDS = new Set(['hero', 'tentang', 'proyek', 'keahlian', 'pengalaman', 'kontak']);

    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      // Strict sanitization: only alphanumeric, hyphens, underscores; max 64 chars
      const cleanHash = rawHash.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 64);
      if (!cleanHash) return;

      // Priority 1: Match against known project slugs/IDs (safe whitelist)
      const matchedProject = PROJECTS.find(p => p.slug === cleanHash || p.id === cleanHash);
      if (matchedProject) {
        setSelectedProject(matchedProject);
        return;
      }

      // Priority 2: Only scroll to whitelisted section IDs (prevents arbitrary DOM targeting)
      if (ALLOWED_SECTION_IDS.has(cleanHash)) {
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 relative selection:bg-indigo-600 selection:text-white">
      
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-indigo-600 z-50 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Glass Navbar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCv={() => setIsCvModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero 
          onNavigate={handleNavigate} 
          onOpenProject={handleOpenProject} 
          onOpenCv={() => setIsCvModalOpen(true)}
        />

        {/* 2. Tentang / About */}
        <About />

        {/* 3. Proyek Unggulan */}
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

      {/* Floating Bottom Quick Action Pill */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={() => setIsCvModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-mono bg-white/95 text-slate-700 border border-slate-200 shadow-lg hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-95 backdrop-blur-xl"
          title="Buka CV"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span>Resume</span>
        </button>

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-mono bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all duration-200 active:scale-95 backdrop-blur-xl group"
          title="Command Palette (Ctrl + K)"
        >
          <Command className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
          <span>Quick Actions</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white ml-0.5">
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
