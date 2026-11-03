import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Maximize2, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Search,
  Calendar
} from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

export const CertificationsTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxCert, setActiveLightboxCert] = useState<Certification | null>(null);

  const categories = [
    { id: 'all', label: 'ALL CREDENTIALS (11)' },
    { id: 'cloud', label: 'AWS & AZURE' },
    { id: 'devops', label: 'K8s, DOCKER & SRE' },
    { id: 'linux', label: 'LINUX ADMIN' },
    { id: 'language', label: 'ENGLISH C1' }
  ];

  const filteredCerts = selectedCategory === 'all'
    ? PORTFOLIO_DATA.certifications
    : PORTFOLIO_DATA.certifications.filter(c => c.category === selectedCategory);

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="badge-code">05 // VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            Certifications & <span className="text-[#00F5FF]">Technical Milestones</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            11+ hands-on verified certifications across AWS, Azure, Kubernetes, Docker, Linux system administration, and Site Reliability Engineering.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playCyberClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded font-mono text-xs transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#00F5FF] text-[#03070d] font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="wireframe-box rounded-xl border border-slate-800 bg-[#060c18]/80 hover:border-[#00F5FF]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Certificate Image Thumbnail */}
                <div 
                  className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800"
                  onClick={() => {
                    playCyberClick();
                    setActiveLightboxCert(cert);
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#03070d]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-[#00F5FF] text-[#03070d] shadow-[0_0_20px_rgba(0,245,255,0.8)]">
                      <Maximize2 size={16} />
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="badge-code text-[10px] bg-[#03070d]/90">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-[#00FF87]">
                      <ShieldCheck size={13} /> VERIFIED
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {cert.issueDate}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-white font-['Space_Grotesk'] group-hover:text-[#00F5FF] transition-colors leading-snug">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    playCyberClick();
                    setActiveLightboxCert(cert);
                  }}
                  className="font-mono text-xs text-[#00F5FF] hover:underline flex items-center gap-1"
                >
                  <Maximize2 size={12} />
                  <span>VIEW CERTIFICATE</span>
                </button>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playCyberClick()}
                    className="font-mono text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <span>EXTERNAL VERIFY</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Res Certificate Lightbox */}
      {activeLightboxCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03070d]/95 backdrop-blur-md"
          onClick={() => setActiveLightboxCert(null)}
        >
          <div 
            className="wireframe-box max-w-4xl w-full p-6 rounded-xl border border-[#00F5FF]/40 bg-[#050b16] max-h-[92vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="badge-code text-xs mb-1 inline-block">
                  {activeLightboxCert.issuer} // {activeLightboxCert.issueDate}
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  {activeLightboxCert.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxCert(null)}
                className="w-8 h-8 rounded border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Display */}
            <div className="rounded-lg overflow-hidden border border-slate-800 bg-[#020509] p-2 flex items-center justify-center">
              <img
                src={activeLightboxCert.image}
                alt={activeLightboxCert.title}
                className="max-h-[60vh] w-auto object-contain rounded shadow-2xl"
              />
            </div>

            <div className="space-y-2 font-sans text-sm text-slate-300">
              <p className="leading-relaxed">
                {activeLightboxCert.description}
              </p>

              {activeLightboxCert.credentialId && (
                <div className="font-mono text-xs text-slate-400 p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[#00F5FF]">Credential ID:</span> {activeLightboxCert.credentialId}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <div className="flex flex-wrap gap-1.5">
                {activeLightboxCert.skills.map((s, idx) => (
                  <span key={idx} className="badge-code text-[11px]">
                    {s}
                  </span>
                ))}
              </div>

              {activeLightboxCert.verifyUrl && (
                <a
                  href={activeLightboxCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberClick()}
                  className="px-4 py-2 rounded bg-[#00F5FF] text-[#03070d] font-mono text-xs font-bold flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                >
                  <span>OFFICIAL VERIFICATION</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
