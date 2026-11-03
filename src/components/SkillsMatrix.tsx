import React, { useState } from 'react';
import { 
  Cloud, 
  Box, 
  LineChart, 
  GitMerge, 
  Sparkles, 
  Terminal as TerminalIcon,
  Copy,
  Check
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberClick } from '../utils/audio';

const SKILL_COMMANDS: Record<string, string> = {
  AWS: 'aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"',
  Azure: 'az vm list --resource-group WaveMoneyRG --output table',
  Docker: 'docker compose -f docker-compose.prod.yml up -d --build',
  Kubernetes: 'kubectl get pods -n wavemoney-prod -o wide --show-labels',
  Linux: 'uname -a && journalctl -u zabbix-agent -n 50 --no-pager',
  Datadog: 'datadog-agent status | grep "Checks: Running"',
  Zabbix: 'zabbix_get -s 10.204.22.99 -k "proc.num[nginx]"',
  Grafana: 'curl -G http://localhost:3000/api/health -H "Authorization: Bearer $GRAFANA_KEY"',
  Prometheus: 'promtool check config /etc/prometheus/prometheus.yml',
  Jenkins: 'java -jar jenkins-cli.jar -s http://jenkins:8080/ build deploy-pipeline -s',
  'Git & GitHub': 'git checkout -b feature/k8s-ingress && git push origin HEAD',
  Terraform: 'terraform plan -out=tfplan.binary && terraform apply tfplan.binary',
  Ansible: 'ansible-playbook -i inventories/prod.ini site.yml --check',
  'AI Workflows': 'antigravity agent --model gemini-3.8-flash --task "optimize dockerfile"'
};

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<string>('Kubernetes');
  const [copied, setCopied] = useState(false);

  const categories = [
    'All',
    'Cloud Infrastructure',
    'Containers & Microservices',
    'Monitoring & Observability',
    'CI/CD & Automation',
    'OS & Kernel'
  ];

  const filteredSkills = selectedCategory === 'All'
    ? PORTFOLIO_DATA.techStack
    : PORTFOLIO_DATA.techStack.filter(s => s.category === selectedCategory || (selectedCategory === 'CI/CD & Automation' && (s.category === 'Infrastructure as Code' || s.category === 'Configuration Management' || s.category === 'Version Control')));

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="badge-code">03 // ARCHITECTURAL TOOLING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
            DevOps & Cloud <span className="text-[#00F5FF]">Tech Matrix</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Production-grade tooling tested across enterprise NOC monitoring, multi-container deployments, and cloud delivery pipelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00F5FF] text-[#03070d] font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid + Live Command Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Grid of skill tiles */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill === skill.name;
              return (
                <button
                  key={skill.name}
                  onClick={() => {
                    playCyberClick();
                    setActiveSkill(skill.name);
                  }}
                  className={`p-4 rounded-lg text-left transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#00F5FF] bg-[#00F5FF]/10 shadow-[0_0_20px_rgba(0,245,255,0.2)]'
                      : 'border-slate-800/80 bg-[#070d18]/70 hover:border-slate-700 hover:bg-[#070d18]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="font-mono text-xs font-bold text-white">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      skill.level === 'Advanced' || skill.level === 'Expert'
                        ? 'bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30'
                        : 'bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20'
                    }`}>
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono leading-relaxed line-clamp-2">
                    {skill.desc}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>{skill.category}</span>
                    <span className="text-[#00F5FF]">&rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Shell Terminal Demonstration */}
          <div className="lg:col-span-5 wireframe-box p-5 rounded-xl border border-[#00F5FF]/25 bg-[#050b16]/90 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-[#00F5FF]" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  SHELL EXECUTION RUNBOOK
                </span>
              </div>
              <span className="badge-code">{activeSkill}</span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono text-slate-400 mb-1">Target Component:</p>
                <p className="text-sm font-bold text-white font-['Space_Grotesk']">
                  {activeSkill} — {PORTFOLIO_DATA.techStack.find(s => s.name === activeSkill)?.category}
                </p>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  {PORTFOLIO_DATA.techStack.find(s => s.name === activeSkill)?.desc}
                </p>
              </div>

              {/* Command Box */}
              <div className="relative p-3 rounded bg-[#020509] border border-slate-800 font-mono text-xs text-[#00FF87] overflow-x-auto">
                <div className="flex justify-between items-center mb-1 text-[10px] text-slate-500">
                  <span>bash // terminal-session</span>
                  <button
                    onClick={() => handleCopy(SKILL_COMMANDS[activeSkill] || 'echo "Running ' + activeSkill + '"')}
                    className="flex items-center gap-1 text-slate-400 hover:text-[#00F5FF] transition-colors"
                  >
                    {copied ? <Check size={12} className="text-[#00FF87]" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="pt-1 flex items-start gap-2">
                  <span className="text-slate-500 select-none">$</span>
                  <span className="text-slate-200 break-all">
                    {SKILL_COMMANDS[activeSkill] || `echo "Executing verified workflow for ${activeSkill}..."`}
                  </span>
                </div>
              </div>

              {/* Verified Proficiency Badge */}
              <div className="p-3 rounded border border-[#00F5FF]/20 bg-[#00F5FF]/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Operational Verification:</span>
                <span className="text-[#00FF87] font-semibold">Production & Lab Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
