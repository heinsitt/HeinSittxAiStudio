import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  FileText, 
  Terminal as TerminalIcon, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';
import { playCyberClick } from '../utils/audio';

interface NavigationProps {
  activeSection: string;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenTerminal: () => void;
  resumeUrl: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  isAudioMuted,
  onToggleAudio,
  onOpenTerminal,
  resumeUrl
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'OVERVIEW', href: '#hero' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'experience', label: 'EXPERIENCE', href: '#experience' },
    { id: 'skills', label: 'TECH STACK', href: '#skills' },
    { id: 'projects', label: 'PROJECTS', href: '#projects' },
    { id: 'certifications', label: 'CERTS', href: '#certifications' },
    { id: 'contact', label: 'CONTACT', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playCyberClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#03070d]/85 backdrop-blur-md border-b border-[#00F5FF]/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-3 no-underline"
        >
          <div className="w-8 h-8 rounded border border-[#00F5FF]/40 bg-[#070d18] flex items-center justify-center font-mono text-xs font-bold text-[#00F5FF] group-hover:border-[#00F5FF] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all">
            HST
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-wider text-slate-100 group-hover:text-[#00F5FF] transition-colors">
              HEIN SITT TUN
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#00F5FF]/70">
              DEVOPS // NOC SRE
            </span>
          </div>
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-3 py-1.5 font-mono text-xs tracking-wider transition-all rounded ${
                  isActive 
                    ? 'text-[#00F5FF] bg-[#00F5FF]/10 border border-[#00F5FF]/30 font-semibold shadow-[0_0_12px_rgba(0,245,255,0.15)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#00F5FF]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleAudio();
              playCyberClick();
            }}
            aria-label={isAudioMuted ? 'Unmute cyber audio' : 'Mute cyber audio'}
            title={isAudioMuted ? 'Enable Audio SFX' : 'Mute Audio SFX'}
            className="w-8 h-8 rounded border border-slate-700/60 bg-[#070d18] flex items-center justify-center text-slate-400 hover:text-[#00F5FF] hover:border-[#00F5FF]/40 transition-colors"
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#00F5FF]" />}
          </button>

          {/* Interactive Terminal Trigger */}
          <button
            onClick={() => {
              playCyberClick();
              onOpenTerminal();
            }}
            title="Open Interactive DevOps CLI"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#00F5FF]/30 bg-[#00F5FF]/5 text-xs font-mono text-[#00F5FF] hover:bg-[#00F5FF]/15 transition-all"
          >
            <TerminalIcon size={13} />
            <span>CLI</span>
          </button>

          {/* Resume PDF */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberClick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00F5FF] text-[#03070d] font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all"
          >
            <FileText size={13} />
            <span>RESUME</span>
            <ExternalLink size={10} className="hidden sm:inline" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => {
              playCyberClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050914] border-b border-[#00F5FF]/20 px-4 pt-3 pb-6 mt-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2 font-mono text-sm tracking-wider text-slate-300 hover:text-[#00F5FF] hover:bg-slate-800/40 rounded border-l-2 border-transparent hover:border-[#00F5FF]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2 flex items-center justify-center gap-2 font-mono text-xs text-[#00F5FF] border border-[#00F5FF]/30 rounded bg-[#00F5FF]/5"
            >
              <TerminalIcon size={14} />
              OPEN INTERACTIVE CLI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
