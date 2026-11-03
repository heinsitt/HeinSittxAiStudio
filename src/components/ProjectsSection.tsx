import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Activity, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'infra' | '3d' | 'frontend'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedFilter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedFilter);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="badge-code">04 // PRODUCTION & LAB BUILDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            Infrastructure Labs <span className="text-[#00F5FF]">& Interactive 3D</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Hands-on Docker/Zabbix/Grafana observability pipelines alongside modern WebGL 3D simulations and high-performance frontend platforms.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {[
            { id: 'all', label: 'ALL PROJECTS' },
            { id: 'infra', label: 'DEVOPS & OBSERVABILITY' },
            { id: '3d', label: '3D & WEBGL LABS' },
            { id: 'frontend', label: 'FRONTEND PLATFORMS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playCyberClick();
                setSelectedFilter(tab.id as typeof selectedFilter);
              }}
              className={`px-4 py-2 rounded font-mono text-xs transition-all ${
                selectedFilter === tab.id
                  ? 'bg-[#00F5FF] text-[#03070d] font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Featured Case Study: Infra Monitoring Lab */}
        {selectedFilter === 'all' || selectedFilter === 'infra' ? (
          <div className="mb-12 wireframe-box p-6 sm:p-8 rounded-xl border border-[#00F5FF]/35 bg-[#050b16]/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30 flex items-center gap-1">
                    <Activity size={12} /> ENTERPRISE CASE STUDY
                  </span>
                  <span className="font-mono text-xs text-slate-400">LAB SERIES 00</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
                  Enterprise Infrastructure Observability Stack
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                  Engineered an end-to-end monitoring pipeline for a containerized WordPress & database stack using <strong>Zabbix 7.0</strong> and <strong>Grafana</strong>. Configured real-time Apache ping health checks, disk volume tracking, host RAM allocation thresholds, and network interface packet telemetry.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400 block text-[10px]">Host Memory</span>
                    <span className="text-[#00FF87] font-bold text-sm">50.3% Active</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400 block text-[10px]">Response Ping</span>
                    <span className="text-[#00F5FF] font-bold text-sm">400 &mu;s Avg</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 font-mono text-xs col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px]">System Uptime</span>
                    <span className="text-white font-bold text-sm">24/7 Verified</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['Docker', 'Zabbix Agent', 'Grafana', 'Linux RHEL', 'Apache', 'Observability'].map((t, idx) => (
                    <span key={idx} className="badge-code">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://heinsitt.github.io/Infra-lab-series-00/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playCyberClick()}
                    className="px-5 py-2.5 rounded bg-[#00F5FF] text-[#03070d] font-mono text-xs font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all"
                  >
                    <span>VIEW LIVE LAB REPORT</span>
                    <ExternalLink size={13} />
                  </a>

                  <button
                    onClick={() => {
                      playCyberClick();
                      setActiveModalProject(PORTFOLIO_DATA.projects[0]);
                    }}
                    className="px-4 py-2.5 rounded border border-slate-700 bg-slate-800/40 text-slate-300 font-mono text-xs flex items-center gap-1.5 hover:text-white hover:border-[#00F5FF]/40 transition-all"
                  >
                    <Maximize2 size={13} />
                    <span>DASHBOARD ZOOM</span>
                  </button>
                </div>
              </div>

              {/* Screenshot Frame */}
              <div className="lg:col-span-5">
                <div 
                  onClick={() => {
                    playCyberClick();
                    setActiveModalProject(PORTFOLIO_DATA.projects[0]);
                  }}
                  className="relative rounded-lg overflow-hidden border border-[#00F5FF]/30 bg-slate-950 group cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src={PORTFOLIO_DATA.projects[0].image}
                    alt="Grafana NOC Dashboard showing live server telemetry"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03070d]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="font-mono text-xs text-[#00F5FF] flex items-center gap-1.5">
                      <Maximize2 size={14} /> Click to expand live Grafana telemetry
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="wireframe-box rounded-xl border border-slate-800 bg-[#060c18]/80 hover:border-[#00F5FF]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Project Image Preview */}
                <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-code text-[10px] bg-[#03070d]/80 backdrop-blur-md">
                      {project.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h4 className="text-lg font-bold text-white font-['Space_Grotesk'] group-hover:text-[#00F5FF] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberClick()}
                  className="font-mono text-xs font-semibold text-[#00F5FF] hover:underline flex items-center gap-1.5"
                >
                  <span>LAUNCH APP</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  onClick={() => {
                    playCyberClick();
                    setActiveModalProject(project);
                  }}
                  className="font-mono text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Maximize2 size={12} />
                  <span>DETAILS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Lightbox Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070d]/90 backdrop-blur-md"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="wireframe-box max-w-3xl w-full p-6 sm:p-8 rounded-xl border border-[#00F5FF]/40 bg-[#050b16] max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="badge-code text-xs mb-1 inline-block">
                  {activeModalProject.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="w-8 h-8 rounded border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full h-auto max-h-[400px] object-contain mx-auto"
              />
            </div>

            <div className="space-y-3 font-sans text-sm text-slate-300">
              <p className="leading-relaxed">
                {activeModalProject.longDescription || activeModalProject.description}
              </p>

              {activeModalProject.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-[#00F5FF]">
                      &bull; {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div className="flex gap-2">
                {activeModalProject.tags.map((t, idx) => (
                  <span key={idx} className="badge-code text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={activeModalProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick()}
                className="px-4 py-2 rounded bg-[#00F5FF] text-[#03070d] font-mono text-xs font-bold flex items-center gap-2 hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]"
              >
                <span>OPEN LIVE BUILD</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
