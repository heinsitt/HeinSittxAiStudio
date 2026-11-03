import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Layers, 
  ArrowRight, 
  Activity, 
  Server, 
  ShieldCheck, 
  Cpu, 
  FileDown
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onExploreTopology: () => void;
}

const ROLES = [
  'Associate DevOps Engineer',
  'Senior NOC Engineer (WaveMoney HQ)',
  'Kubernetes & Cloud Practitioner',
  'Infrastructure Automation & SRE'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  onExploreTopology
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFull = ROLES[roleIndex];

    if (!isDeleting && displayText.length < currentFull.length) {
      timer = setTimeout(() => {
        setDisplayText(currentFull.slice(0, displayText.length + 1));
      }, 50);
    } else if (!isDeleting && displayText.length === currentFull.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentFull.slice(0, displayText.length - 1));
      }, 30);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Architectural Hero Typography */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00F5FF]/30 bg-[#070d18]/80 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00FF87]" />
            <span className="font-mono text-xs text-slate-300 tracking-wider">
              ENTERPRISE NOC 24/7 // <span className="text-[#00F5FF]">ALL SYSTEMS NOMINAL</span>
            </span>
          </div>

          {/* Main Title */}
          <div>
            <p className="font-mono text-xs sm:text-sm text-[#00F5FF] tracking-[0.25em] uppercase mb-2">
              Cloud Infrastructure & Operations
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-['Space_Grotesk']">
              HEIN SITT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#A855F7] to-[#00FF87]">TUN</span>
            </h1>
          </div>

          {/* Animated Role Cycler */}
          <div className="flex items-center gap-3 font-mono text-lg sm:text-2xl text-slate-200 min-h-[38px] border-l-2 border-[#00F5FF] pl-4 bg-[#070d18]/40 py-1 pr-4 rounded-r">
            <span className="text-[#00F5FF] font-semibold">{displayText}</span>
            <span className="w-2.5 h-5 bg-[#00F5FF] animate-pulse inline-block" />
          </div>

          {/* Bio text */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
            Senior NOC Engineer at <strong className="text-white">WaveMoney HQ site</strong> bridging 24/7 enterprise monitoring, rapid incident triage, and Linux administration with modern <span className="text-[#00F5FF] font-mono">DevOps</span> automation, Docker containerization, and AWS/Azure cloud engineering.
          </p>

          {/* Key metric chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl pt-2">
            {PORTFOLIO_DATA.profile.stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-3 rounded border border-slate-800 bg-[#070d18]/70 backdrop-blur-sm flex flex-col"
              >
                <span className="font-mono text-xs text-slate-400">{stat.label}</span>
                <span className="font-mono text-xl font-bold text-[#00F5FF] mt-1">{stat.value}</span>
                <span className="font-mono text-[10px] text-slate-550 text-slate-400 mt-0.5">{stat.sub}</span>
              </div>
            ))}
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 w-full">
            <button
              onClick={() => {
                playCyberClick();
                onExploreTopology();
              }}
              className="px-5 py-3 rounded bg-[#00F5FF] text-[#03070d] font-mono text-xs font-bold tracking-wider flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] transition-all"
            >
              <Layers size={15} />
              EXPLORE TOPOLOGY
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => {
                playCyberClick();
                onOpenTerminal();
              }}
              className="px-5 py-3 rounded border border-[#00F5FF]/30 bg-[#070d18]/80 text-[#00F5FF] font-mono text-xs font-semibold tracking-wider flex items-center gap-2 hover:bg-[#00F5FF]/10 transition-all"
            >
              <Terminal size={15} />
              DEV CLI ACCESS
            </button>

            <a
              href={PORTFOLIO_DATA.profile.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick()}
              className="px-4 py-3 rounded border border-slate-700 bg-slate-900/60 text-slate-300 font-mono text-xs tracking-wider flex items-center gap-2 hover:text-white hover:border-slate-500 transition-all"
            >
              <FileDown size={14} />
              CV / RESUME
            </a>
          </div>
        </div>

        {/* Right Column: Architectural HUD Telemetry Card */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="wireframe-box p-5 rounded-lg border border-[#00F5FF]/25 bg-[#050b16]/85 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF]" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  CLUSTER TELEMETRY
                </span>
              </div>
              <span className="badge-code">LIVE // AP-SE-1</span>
            </div>

            {/* Metrics Grid */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <Activity size={14} className="text-[#00FF87]" />
                  <span>NOC Observability:</span>
                </div>
                <span className="text-[#00FF87] font-semibold">Datadog + Zabbix (24/7)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <Server size={14} className="text-[#00F5FF]" />
                  <span>Kube & Containers:</span>
                </div>
                <span className="text-[#00F5FF] font-semibold">Docker // RKE2 K8s</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <Cpu size={14} className="text-[#A855F7]" />
                  <span>Host OS:</span>
                </div>
                <span className="text-[#A855F7] font-semibold">RHEL 9 / Rocky / Ubuntu</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck size={14} className="text-[#00F5FF]" />
                  <span>Incident Triage SLA:</span>
                </div>
                <span className="text-white font-semibold">&lt; 5 min (Target Met)</span>
              </div>
            </div>

            {/* Simulated Live Sparkline / Load Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span>Infrastructure Reliability</span>
                <span className="text-[#00FF87]">99.99% Guaranteed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00F5FF] via-[#A855F7] to-[#00FF87] rounded-full w-[99.99%]" />
              </div>
            </div>

            <div className="mt-4 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Drag / scroll 3D model to inspect</span>
              <span className="text-[#00F5FF]">Three.js v0.160+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
