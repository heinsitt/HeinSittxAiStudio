import React from 'react';
import { GraduationCap, Languages, Award, User, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="badge-code">01 // PROFILE & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            Senior NOC Discipline <span className="text-[#00F5FF]">× Modern DevOps Velocity</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Blending real-time operational vigilance at WaveMoney with modern cloud infrastructure, container orchestration, and AI-driven frontend workflows.
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Portrait Frame & Quick Facts */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="wireframe-box p-3 rounded-xl border border-[#00F5FF]/25 bg-[#060c18]/80 group">
              <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-slate-900">
                <img 
                  src={PORTFOLIO_DATA.profile.photo} 
                  alt="Hein Sitt Tun - DevOps Engineer"
                  className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                {/* Tech overlay border */}
                <div className="absolute inset-0 border border-[#00F5FF]/20 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#03070d] via-[#03070d]/80 to-transparent">
                  <p className="font-mono text-xs font-bold text-white">HEIN SITT TUN</p>
                  <p className="font-mono text-[11px] text-[#00F5FF]">Associate DevOps Engineer</p>
                  <p className="font-mono text-[10px] text-slate-400 mt-0.5">WaveMoney HQ Site // NOC Operations</p>
                </div>
              </div>
            </div>

            {/* Language & Location Card */}
            <div className="p-4 rounded-lg border border-slate-800 bg-[#070d18]/70 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Languages size={15} className="text-[#00F5FF]" />
                  <span>Languages:</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white">Burmese (Native)</span>
                  <span className="text-[#00FF87] font-semibold">English (C1 Advanced)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <User size={15} className="text-[#A855F7]" />
                  <span>Core Strengths:</span>
                </div>
                <span className="text-slate-200">Incident Triage // System Resilience</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Journey & Education */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mission Statement */}
            <div className="p-6 rounded-lg border border-slate-800 bg-[#070d18]/80 backdrop-blur-sm space-y-4 font-sans">
              <h3 className="font-mono text-xs font-bold text-[#00F5FF] tracking-wider uppercase flex items-center gap-2">
                <Sparkles size={14} />
                THE INFRASTRUCTURE PERSPECTIVE
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                With a strong background in 24/7 mission-critical operations at <strong className="text-white">WaveMoney HQ</strong>, I specialize in keeping distributed services online, fault-tolerant, and observable. I combine deep Linux kernel/system administration with modern observability pipelines using <span className="text-[#00F5FF]">Datadog, Zabbix, Grafana, and AWS CloudWatch</span>.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                In parallel, I actively apply agentic AI development tooling—including Cursor, Claude, AntiGravity, and Base44—to accelerate prototyping, automate deployment scripts, and engineer responsive frontend architectures. My goal is to build automated cloud systems where code flows smoothly from commit to containerized production with zero friction.
              </p>
            </div>

            {/* Education Cards */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                <GraduationCap size={15} className="text-[#A855F7]" />
                FORMAL ACADEMIC FOUNDATIONS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.education.map((edu, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-lg border border-slate-800/90 bg-[#070d18]/70 hover:border-[#00F5FF]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="badge-code text-[10px] mb-2 inline-block">
                        {idx === 0 ? 'ENGINEERING DIPLOMA' : 'BACHELOR OF SCIENCE'}
                      </span>
                      <h4 className="font-bold text-sm text-white font-['Space_Grotesk'] mt-1">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-[#00F5FF] font-mono mt-1">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                        {edu.specialization}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Status:</span>
                      <span className="text-[#00FF87] flex items-center gap-1">
                        <Award size={12} /> {edu.period}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
