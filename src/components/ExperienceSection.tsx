import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldAlert, 
  Activity, 
  GitBranch, 
  BellRing,
  Cpu
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wavemoney' | 'ngo'>('wavemoney');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    { title: '24/7 Real-Time Telemetry', tool: 'Datadog + Zabbix', desc: 'Continuous metric ingestion for payment APIs, transaction latencies, and host memory/CPU.' },
    { title: 'Cloud Resource Audit', tool: 'AWS CloudWatch', desc: 'Monitoring EC2 instances, S3 storage buckets, and database RDS throughput against thresholds.' },
    { title: 'Incident Triage & Mitigation', tool: 'PagerDuty / SRE Bridge', desc: 'Identifying P1/P2 alert triggers within 60 seconds; coordinating emergency mitigation.' },
    { title: 'Stakeholder Communications', tool: 'Partner Gateways', desc: 'Dispatching structured notifications for scheduled maintenance and critical event timelines.' }
  ];

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="badge-code">02 // MISSION-CRITICAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            Enterprise Operations & <span className="text-[#00F5FF]">NOC Engineering</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Overseeing real-time infrastructure reliability for WaveMoney—powering nationwide fintech transactions with zero unplanned downtime tolerance.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => {
              playCyberClick();
              setActiveTab('wavemoney');
            }}
            className={`px-4 py-2 font-mono text-xs rounded transition-all flex items-center gap-2 ${
              activeTab === 'wavemoney'
                ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/40 shadow-[0_0_15px_rgba(0,245,255,0.15)] font-bold'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-transparent'
            }`}
          >
            <Building2 size={14} />
            <span>WAVEMONEY HQ // SENIOR NOC</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/30">ACTIVE</span>
          </button>

          <button
            onClick={() => {
              playCyberClick();
              setActiveTab('ngo');
            }}
            className={`px-4 py-2 font-mono text-xs rounded transition-all flex items-center gap-2 ${
              activeTab === 'ngo'
                ? 'bg-[#00F5FF]/15 text-[#00F5FF] border border-[#00F5FF]/40 shadow-[0_0_15px_rgba(0,245,255,0.15)] font-bold'
                : 'text-slate-400 hover:text-white bg-slate-900/40 border border-transparent'
            }`}
          >
            <Building2 size={14} />
            <span>NGO IT OPERATIONS</span>
          </button>
        </div>

        {activeTab === 'wavemoney' && (
          <div className="space-y-8">
            {/* Primary Experience Card */}
            <div className="wireframe-box p-6 sm:p-8 rounded-xl border border-[#00F5FF]/30 bg-[#060c18]/85">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[#00F5FF] font-semibold">BIM GROUP OF COMPANIES</span>
                    <span className="text-slate-500">•</span>
                    <span className="font-mono text-xs text-slate-400">WaveMoney HQ Site</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                    Senior NOC Engineer
                  </h3>
                </div>

                <div className="flex flex-col sm:items-end font-mono text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00FF87]">
                    <Clock size={13} />
                    <span>May 2025 – Present</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin size={13} />
                    <span>Yangon, Myanmar (On-site HQ)</span>
                  </div>
                </div>
              </div>

              {/* SLA Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-3 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <Activity size={20} className="text-[#00FF87]" />
                  <div>
                    <p className="text-[11px] font-mono text-slate-400">Availability SLA</p>
                    <p className="text-base font-mono font-bold text-white">99.99% Monitored</p>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <ShieldAlert size={20} className="text-[#00F5FF]" />
                  <div>
                    <p className="text-[11px] font-mono text-slate-400">P1/P2 Alert Triage</p>
                    <p className="text-base font-mono font-bold text-white">&lt; 60s Detection</p>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                  <GitBranch size={20} className="text-[#A855F7]" />
                  <div>
                    <p className="text-[11px] font-mono text-slate-400">Cross-Team Collaboration</p>
                    <p className="text-base font-mono font-bold text-white">WaveMoney SRE & DBAs</p>
                  </div>
                </div>
              </div>

              {/* Core Responsibilities */}
              <div className="space-y-3 font-sans text-sm text-slate-300">
                <h4 className="font-mono text-xs font-bold text-slate-300 tracking-wider uppercase mb-3 flex items-center gap-2">
                  <Cpu size={14} className="text-[#00F5FF]" />
                  ENTERPRISE RESPONSIBILITIES & ACHIEVEMENTS:
                </h4>
                <ul className="space-y-3">
                  {PORTFOLIO_DATA.experiences[0].highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#00F5FF] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools Chips */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-slate-400 mr-2">Core NOC Stack:</span>
                {PORTFOLIO_DATA.experiences[0].tools.map((t, idx) => (
                  <span key={idx} className="badge-code">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive NOC Workflow Visualizer */}
            <div className="p-6 rounded-xl border border-slate-800 bg-[#070d18]/70">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-mono text-xs font-bold text-[#00F5FF] tracking-wider uppercase flex items-center gap-2">
                  <BellRing size={14} />
                  WAVEMONEY 24/7 INCIDENT & OBSERVABILITY PIPELINE
                </h4>
                <span className="text-[11px] font-mono text-slate-400">Step {activeWorkflowStep + 1} of 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
                {workflowSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playCyberClick();
                      setActiveWorkflowStep(idx);
                    }}
                    className={`p-3 rounded text-left transition-all font-mono text-xs border ${
                      activeWorkflowStep === idx
                        ? 'border-[#00F5FF] bg-[#00F5FF]/10 text-white shadow-[0_0_12px_rgba(0,245,255,0.2)]'
                        : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] text-[#00F5FF] font-bold">0{idx + 1} // STEP</div>
                    <div className="font-bold mt-1 truncate">{step.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">{step.tool}</div>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded border border-slate-800/80 bg-slate-900/60 font-sans">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-bold text-white text-sm">
                    {workflowSteps[activeWorkflowStep].title}
                  </h5>
                  <span className="badge-code text-[11px]">
                    {workflowSteps[activeWorkflowStep].tool}
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                  {workflowSteps[activeWorkflowStep].desc}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ngo' && (
          <div className="wireframe-box p-6 sm:p-8 rounded-xl border border-slate-800 bg-[#060c18]/85">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-slate-400">HUMANITARIAN NGO</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                  IT Support Specialist
                </h3>
              </div>
              <div className="flex flex-col sm:items-end font-mono text-xs space-y-1">
                <span className="text-slate-400">May 2024 – Dec 2024</span>
                <span className="text-slate-400">Yangon & Field Sites</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Delivered mission-critical field communication infrastructure and technical support for humanitarian operations, troubleshooting workstation endpoints, network hardware, and remote team connectivity.
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              {PORTFOLIO_DATA.experiences[1].highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00F5FF] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
              {PORTFOLIO_DATA.experiences[1].tools.map((t, idx) => (
                <span key={idx} className="badge-code">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
