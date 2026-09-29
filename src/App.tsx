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
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { CvModal } from './components/CvModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import { initConsoleSecurityBanner } from './utils/security';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  // Initialize console security warning banner for developers/inspectors
  useEffect(() => {
    initConsoleSecurityBanner();
  }, []);

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

  // Handle URL hash changes for deep linking
  useEffect(() => {
    const ALLOWED_SECTION_IDS = new Set(['hero', 'tentang', 'proyek', 'keahlian', 'pengalaman', 'pencapaian', 'kontak']);

    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      const cleanHash = rawHash.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 64);
      if (!cleanHash) return;

      const matchedProject = PROJECTS.find(p => p.slug === cleanHash || p.id === cleanHash);
      if (matchedProject) {
        setSelectedProject(matchedProject);
        return;
      }

      if (ALLOWED_SECTION_IDS.has(cleanHash)) {
        const element = document.getElementById(cleanHash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Active section spy
  useEffect(() => {
    const sections = ['hero', 'tentang', 'proyek', 'keahlian', 'pengalaman', 'pencapaian', 'kontak'];

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when any modal is open
  const isAnyModalOpen = !!selectedProject || isCommandPaletteOpen || isCvModalOpen;
  useEffect(() => {
    const scrollY = window.scrollY;
    if (isAnyModalOpen) {
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('body-scroll-locked');
    } else {
      const top = document.body.style.top;
      document.body.classList.remove('body-scroll-locked');
      document.body.style.top = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    }
  }, [isAnyModalOpen]);

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
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-neutral-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Lewati ke konten utama
      </a>

      <ScrollProgressBar />

      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCv={() => setIsCvModalOpen(true)}
      />

      <main id="main-content" className="flex-1">
        <Hero
          onNavigate={handleNavigate}
          onOpenProject={handleOpenProject}
          onOpenCv={() => setIsCvModalOpen(true)}
        />
        <About />
        <Projects onOpenProject={handleOpenProject} />
        <Skills />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseProject} />
      )}

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenProject={handleOpenProject}
        onOpenCv={() => setIsCvModalOpen(true)}
      />

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}
