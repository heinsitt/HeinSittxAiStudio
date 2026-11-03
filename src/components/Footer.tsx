import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playCyberClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#02050b] py-12 px-4 sm:px-6 lg:px-8 z-10 font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Role */}
        <div className="flex items-center gap-3">
          <img 
            src={PORTFOLIO_DATA.profile.devopsIcon} 
            alt="DevOps Logo" 
            className="w-7 h-auto object-contain"
          />
          <div>
            <p className="font-bold text-white tracking-wider">HEIN SITT TUN</p>
            <p className="text-[10px] text-[#00F5FF]">Associate DevOps Engineer // WaveMoney HQ Site NOC</p>
          </div>
        </div>

        {/* Center: Quick Section Links */}
        <div className="flex flex-wrap justify-center gap-4 text-[11px]">
          <a href="#hero" className="hover:text-[#00F5FF] transition-colors">OVERVIEW</a>
          <a href="#about" className="hover:text-[#00F5FF] transition-colors">ABOUT</a>
          <a href="#experience" className="hover:text-[#00F5FF] transition-colors">EXPERIENCE</a>
          <a href="#skills" className="hover:text-[#00F5FF] transition-colors">TECH MATRIX</a>
          <a href="#projects" className="hover:text-[#00F5FF] transition-colors">PROJECTS</a>
          <a href="#certifications" className="hover:text-[#00F5FF] transition-colors">CERTS</a>
          <a href="#contact" className="hover:text-[#00F5FF] transition-colors">CONTACT</a>
        </div>

        {/* Right: Social & Scroll To Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-slate-400">
            <a 
              href={PORTFOLIO_DATA.profile.github} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[#00F5FF] transition-colors"
            >
              <Github size={16} />
            </a>
            <a 
              href={PORTFOLIO_DATA.profile.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[#00F5FF] transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href={`mailto:${PORTFOLIO_DATA.profile.email}`} 
              aria-label="Email Contact"
              className="hover:text-[#00F5FF] transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="w-8 h-8 rounded border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-300 hover:text-[#00F5FF] hover:border-[#00F5FF]/40 transition-colors"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
        <p>&copy; {new Date().getFullYear()} Hein Sitt Tun. All systems engineered with precision.</p>
        <p className="flex items-center gap-1">
          <span>Engineered with React 19, TypeScript, Tailwind &amp; Three.js</span>
        </p>
      </div>
    </footer>
  );
};
