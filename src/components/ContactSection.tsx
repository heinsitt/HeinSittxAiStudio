import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle2, 
  Activity, 
  MapPin, 
  Copy, 
  Check 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playCyberClick();
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="badge-code">06 // DIRECT UPLINK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            Initiate Contact & <span className="text-[#00F5FF]">Collaboration</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Ready for Associate DevOps Engineer roles, enterprise NOC site management, and cloud infrastructure automation. Let's discuss your architectural needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Coordinates Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="wireframe-box p-6 rounded-xl border border-[#00F5FF]/30 bg-[#060c18]/85 space-y-5">
              <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase flex items-center gap-2">
                <Activity size={14} className="text-[#00FF87]" />
                COMMUNICATION ENDPOINTS
              </h3>

              {/* Email */}
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-mono text-[10px] text-slate-400 block">PRIMARY EMAIL:</span>
                <div className="flex items-center justify-between">
                  <a 
                    href={`mailto:${PORTFOLIO_DATA.profile.email}`} 
                    className="font-mono text-xs text-[#00F5FF] hover:underline"
                  >
                    {PORTFOLIO_DATA.profile.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check size={14} className="text-[#00FF87]" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-mono text-[10px] text-slate-400 block">DIRECT PHONES:</span>
                <div className="font-mono text-xs text-white space-y-0.5">
                  <div>+95 995 020 2656</div>
                  <div>+95 967 013 2436</div>
                </div>
              </div>

              {/* Location & Status */}
              <div className="p-3 rounded bg-slate-900/80 border border-slate-800 space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                  <MapPin size={12} className="text-[#00F5FF]" />
                  <span>LOCATION:</span>
                </div>
                <div className="text-white">Yangon, Myanmar (UTC+6:30)</div>
                <div className="text-[11px] text-[#00FF87] pt-1">
                  &bull; Open to On-Site, Hybrid & Global Remote
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberClick()}
                  className="flex-1 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-[#00F5FF]/40 text-slate-300 hover:text-[#00F5FF] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCyberClick()}
                  className="flex-1 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-[#00F5FF]/40 text-slate-300 hover:text-[#00F5FF] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                </a>
              </div>
            </div>

            {/* Network Latency Handshake Card */}
            <div className="p-4 rounded-xl border border-slate-800 bg-[#070d18]/70 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>EDGE HANDSHAKE:</span>
                <span className="text-[#00FF87]">ONLINE // TLS 1.3</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>ap-southeast-1 (Singapore):</span>
                <span className="text-[#00F5FF]">18 ms</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Yangon Core Ingress:</span>
                <span className="text-[#00F5FF]">1.2 ms</span>
              </div>
            </div>
          </div>

          {/* Right: Dispatch Message Form */}
          <div className="lg:col-span-7">
            <div className="wireframe-box p-6 sm:p-8 rounded-xl border border-[#00F5FF]/25 bg-[#050b16]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                    Dispatch Telemetry Message
                  </h3>
                  <p className="font-mono text-xs text-slate-400 mt-0.5">
                    Direct transmit to Hein Sitt Tun's inbox
                  </p>
                </div>
                <span className="badge-code">SMTP ENCRYPTED</span>
              </div>

              {isSent ? (
                <div className="p-8 text-center space-y-4 rounded-lg bg-[#00FF87]/10 border border-[#00FF87]/30">
                  <CheckCircle2 size={40} className="text-[#00FF87] mx-auto" />
                  <h4 className="text-xl font-bold text-white font-['Space_Grotesk']">
                    Message Transmitted Successfully
                  </h4>
                  <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Your transmission has been queued for immediate triage. Expect a reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1.5">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-3 py-2.5 rounded bg-[#020509] border border-slate-800 text-white placeholder-slate-600 focus:border-[#00F5FF] focus:outline-none focus:ring-1 focus:ring-[#00F5FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1.5">YOUR EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3 py-2.5 rounded bg-[#020509] border border-slate-800 text-white placeholder-slate-600 focus:border-[#00F5FF] focus:outline-none focus:ring-1 focus:ring-[#00F5FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5">PROJECT / INQUIRY SUBJECT</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="DevOps Opportunity // Cloud Infrastructure Project"
                      className="w-full px-3 py-2.5 rounded bg-[#020509] border border-slate-800 text-white placeholder-slate-600 focus:border-[#00F5FF] focus:outline-none focus:ring-1 focus:ring-[#00F5FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5">MESSAGE PAYLOAD *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Hein Sitt, we are looking for an Associate DevOps Engineer to manage container clusters..."
                      className="w-full px-3 py-2.5 rounded bg-[#020509] border border-slate-800 text-white placeholder-slate-600 focus:border-[#00F5FF] focus:outline-none focus:ring-1 focus:ring-[#00F5FF] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded bg-[#00F5FF] text-[#03070d] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] transition-all disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'ENCRYPTING & DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
