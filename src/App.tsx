import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import LookingFor from './components/LookingFor';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import EmailFormModal from './components/EmailFormModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-900 bg-[#fafbfd] selection:bg-blue-100 selection:text-blue-800">
      {/* Embedded Floating Grid Background Elements */}
      <div className="fixed inset-0 bg-grid opacity-75 pointer-events-none z-0" />

      {/* Main Structural Layout Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation bar */}
        <Header onOpenResume={() => setIsResumeOpen(true)} />

        {/* Content body layout */}
        <main className="flex-grow">
          {/* Hero Unit */}
          <Hero onOpenResume={() => setIsResumeOpen(true)} />

          {/* About Column Block */}
          <About />

          {/* Categorized Tech Skills Grid */}
          <TechStack />

          {/* Staggered Vertical Timeline */}
          <Experience />

          {/* Featured Case Studies */}
          <Projects onOpenDetails={(proj) => setSelectedProject(proj)} />

          {/* What I'm Looking For Bento-Column Card */}
          <LookingFor />

          {/* Quick connection footer card */}
          <Contact onOpenEmailForm={() => setIsEmailFormOpen(true)} />
        </main>

        {/* Brand Copyright Signoffs */}
        <Footer />
      </div>

      {/* Overlays / Interactive Slide-Overs */}
      <AnimatePresence>
        {/* Detailed Case Study Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* Fully Printable CV Resume Modal */}
        {isResumeOpen && (
          <ResumeModal onClose={() => setIsResumeOpen(false)} />
        )}

        {/* Interactive Contacts Composer Modal */}
        {isEmailFormOpen && (
          <EmailFormModal onClose={() => setIsEmailFormOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
