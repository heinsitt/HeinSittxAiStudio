import React, { useState, useEffect, useRef } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsTimeline } from './components/CertificationsTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ControlDock } from './components/ControlDock';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { setAudioMuted, playCyberClick } from './utils/audio';
import { Activity, X, Server } from 'lucide-react';

export default function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [neonTheme, setNeonTheme] = useState<'cyan' | 'purple' | 'green'>('cyan');
  const [orbitMode, setOrbitMode] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [isAudioMuted, setIsAudioMutedState] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [inspectedNode, setInspectedNode] = useState<{
    name: string;
    status: string;
    role: string;
    metric: string;
  } | null>(null);

  const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];

  // Handle scroll to track section & progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Determine active section based on scroll offset
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setCurrentSectionIndex(i);
            setActiveSectionId(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts (T for terminal, M for audio)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleAudio();
      } else if (e.key === 'z' || e.key === 'Z') {
        setZenMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAudioMuted]);

  const handleToggleAudio = () => {
    const nextState = !isAudioMuted;
    setIsAudioMutedState(nextState);
    setAudioMuted(nextState);
    if (!nextState) playCyberClick();
  };

  const handleSelectSectionPreset = (index: number) => {
    setCurrentSectionIndex(index);
    const targetId = sectionIds[index];
    if (targetId) {
      setActiveSectionId(targetId);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03070d] text-slate-100 font-sans selection:bg-[#00F5FF]/30 selection:text-[#00F5FF]">
      {/* 3D Interactive WebGL Infrastructure Canvas */}
      <ThreeCanvas
        currentSection={currentSectionIndex}
        scrollProgress={scrollProgress}
        wireframeOnly={wireframeOnly}
        neonTheme={neonTheme}
        orbitMode={orbitMode}
        onSelectNode={(node) => setInspectedNode(node)}
      />

      {/* Subtle blueprint grid overlay & depth gradient */}
      <div className="blueprint-grid fixed inset-0 pointer-events-none opacity-40 z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#03070d]/60 via-transparent to-[#03070d]/90 pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navigation
        activeSection={activeSectionId}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        resumeUrl={PORTFOLIO_DATA.profile.resumePdf}
      />

      {/* 3D Node Inspection Toast in Top-Right */}
      {inspectedNode && (
        <div className="fixed top-20 right-4 z-40 max-w-sm wireframe-box p-4 rounded-lg border border-[#00F5FF]/50 bg-[#050b16]/95 shadow-[0_10px_35px_rgba(0,245,255,0.25)] animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#00F5FF]">
              <Server size={13} />
              <span>{inspectedNode.name}</span>
            </div>
            <button
              onClick={() => setInspectedNode(null)}
              className="text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
          <div className="pt-2 font-mono text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Role:</span>
              <span className="text-white">{inspectedNode.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="text-[#00FF87]">{inspectedNode.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Throughput:</span>
              <span className="text-[#00F5FF] font-bold">{inspectedNode.metric}</span>
            </div>
          </div>
        </div>
      )}

      {/* Zen Mode Notice Pill */}
      {zenMode && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full border border-[#A855F7]/50 bg-[#070d18]/90 font-mono text-xs text-[#A855F7] flex items-center gap-2">
          <span>ZEN 3D INSPECTION MODE ACTIVE</span>
          <button 
            onClick={() => setZenMode(false)}
            className="text-white underline hover:text-[#00F5FF]"
          >
            RESTORE UI
          </button>
        </div>
      )}

      {/* Main Content Sections (Fade out if Zen Mode is activated) */}
      <main className={`relative z-10 transition-opacity duration-500 ${zenMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <HeroSection
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onExploreTopology={() => handleSelectSectionPreset(2)}
        />
        <AboutSection />
        <ExperienceSection />
        <SkillsMatrix />
        <ProjectsSection />
        <CertificationsTimeline />
        <ContactSection />
        <Footer />
      </main>

      {/* Collapsible Bottom Control Dock for 3D Viewport */}
      <ControlDock
        currentSection={currentSectionIndex}
        onSetSection={handleSelectSectionPreset}
        wireframeOnly={wireframeOnly}
        onToggleWireframe={() => setWireframeOnly(!wireframeOnly)}
        neonTheme={neonTheme}
        onSetNeonTheme={(t) => setNeonTheme(t)}
        orbitMode={orbitMode}
        onToggleOrbit={() => setOrbitMode(!orbitMode)}
        zenMode={zenMode}
        onToggleZen={() => setZenMode(!zenMode)}
      />

      {/* Interactive DevOps CLI Terminal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
