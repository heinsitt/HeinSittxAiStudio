import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { playTerminalEnter, playCyberClick } from '../utils/audio';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string[];
  type?: 'success' | 'info' | 'error' | 'cyan';
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys.init --profile=heinsitt',
      output: [
        '=================================================================',
        '  HEIN SITT TUN // DEVOPS & INFRASTRUCTURE CLI v4.2.0',
        '  Target Node: wavemoney-noc-prod.asia-southeast1',
        '  Status: ALL SYSTEMS NOMINAL // SLA: 99.99%',
        '=================================================================',
        'Type "help" to view executable commands or click quick action buttons below.'
      ],
      type: 'cyan'
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleExecute = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    playTerminalEnter();
    const parts = raw.split(' ');
    const mainCmd = parts[0].toLowerCase();

    let outputLines: string[] = [];
    let logType: CommandLog['type'] = 'info';

    switch (mainCmd) {
      case 'help':
        outputLines = [
          'AVAILABLE ARCHITECTURAL RUNBOOKS:',
          '  status        - Check enterprise cluster health and 24/7 NOC uptime',
          '  kubectl       - Run simulated kubectl commands (e.g. "kubectl get pods")',
          '  docker        - List active production containers ("docker ps")',
          '  whoami        - Display engineer identity & credentials',
          '  skills        - Audit technical stack proficiency (AWS, K8s, Linux)',
          '  certs         - Print all 11 verified cloud & DevOps certificates',
          '  ping          - Test ICMP latency to WaveMoney gateway ("ping wavemoney.com")',
          '  contact       - Output direct phone, email, and social coordinates',
          '  clear         - Clear terminal console logs',
          '  exit          - Close interactive terminal session'
        ];
        logType = 'cyan';
        break;

      case 'whoami':
        outputLines = [
          `Engineer: ${PORTFOLIO_DATA.profile.name}`,
          `Role: ${PORTFOLIO_DATA.profile.headline}`,
          `Location: ${PORTFOLIO_DATA.profile.location}`,
          `Current Site: WaveMoney HQ (BIM Group of Companies) - Senior NOC`,
          `Education: Diploma in IT (G.T.I) + B.Sc Applied Mathematics (Dagon Univ)`
        ];
        logType = 'success';
        break;

      case 'status':
        outputLines = [
          '[✓] WaveMoney HQ Core Ingress: HEALTHY (14.2k req/s)',
          '[✓] Datadog Observability Agent: STREAMING (Checks: 42 running, 0 failed)',
          '[✓] Zabbix 7.0 Synthetic Pings: OK (0 packet loss, 1.2ms latency)',
          '[✓] AWS CloudWatch Alarm Metric: 0 in ALARM state',
          '[✓] Container Cluster: 5 active Docker stacks, 8 RKE2 pods ready',
          '[✓] SLA Guaranteed: 99.99% (Incident MTTR: < 5 min)'
        ];
        logType = 'success';
        break;

      case 'kubectl':
        outputLines = [
          'NAMESPACE         NAME                               READY   STATUS    RESTARTS   AGE',
          'wavemoney-prod    payment-gateway-ingress-79f8b4d   1/1     Running   0          42d',
          'wavemoney-prod    transaction-core-api-65b8df4      3/3     Running   0          42d',
          'monitoring        datadog-cluster-agent-9b4f2c      1/1     Running   0          180d',
          'monitoring        zabbix-agent2-daemon-5d7e8a       1/1     Running   0          180d',
          'kube-system       rke2-ingress-controller-4c91a    1/1     Running   0          180d'
        ];
        logType = 'info';
        break;

      case 'docker':
        outputLines = [
          'CONTAINER ID   IMAGE                 COMMAND                  STATUS          PORTS',
          '4aeb08d19024   grafana/grafana:10    "/run.sh"                Up 42 days      0.0.0.0:3000->3000/tcp',
          '7955dc591e0a   zabbix/zabbix-server  "/usr/sbin/zabbix_s…"   Up 42 days      0.0.0.0:10051->10051/tcp',
          '5af66258e3c6   wordpress:apache      "docker-entrypoint…"     Up 42 days      0.0.0.0:8080->80/tcp',
          '262c61d7ecd0   mysql:8.0             "docker-entrypoint…"     Up 42 days      3306/tcp'
        ];
        logType = 'info';
        break;

      case 'certs':
        outputLines = [
          'VERIFIED CERTIFICATIONS & CREDENTIALS:',
          ...PORTFOLIO_DATA.certifications.map((c, i) => `  [${i + 1}] ${c.title} — ${c.issuer} (${c.issueDate})`)
        ];
        logType = 'cyan';
        break;

      case 'skills':
        outputLines = [
          'CORE STACK PROFICIENCY:',
          '  [Cloud]       AWS (EC2, S3, CloudWatch, VPC), Azure Fundamentals',
          '  [Containers]  Docker, Docker Compose, Kubernetes (RKE2 / Level 1)',
          '  [OS & Kernel] Linux (RHEL 9, Rocky Linux, Ubuntu), Bash Scripting',
          '  [NOC / SRE]   Datadog Enterprise APM, Zabbix 7, Grafana, Prometheus',
          '  [CI/CD & IaC] Git, GitHub, GitLab, Jenkins, Terraform Fundamentals',
          '  [AI Tooling]  Cursor, Claude, AntiGravity, Base44 agentic coding'
        ];
        logType = 'info';
        break;

      case 'ping':
        const host = parts[1] || 'wavemoney.com.mm';
        outputLines = [
          `PING ${host} (10.204.22.99): 56 data bytes`,
          `64 bytes from 10.204.22.99: icmp_seq=0 ttl=64 time=1.142 ms`,
          `64 bytes from 10.204.22.99: icmp_seq=1 ttl=64 time=1.095 ms`,
          `64 bytes from 10.204.22.99: icmp_seq=2 ttl=64 time=1.187 ms`,
          `--- ${host} ping statistics ---`,
          `3 packets transmitted, 3 packets received, 0.0% packet loss`,
          `round-trip min/avg/max = 1.095/1.141/1.187 ms`
        ];
        logType = 'success';
        break;

      case 'contact':
        outputLines = [
          'DIRECT TELEMETRY COORDINATES:',
          `  Email:    ${PORTFOLIO_DATA.profile.email}`,
          `  Phones:   ${PORTFOLIO_DATA.profile.phones.join(' / ')}`,
          `  LinkedIn: ${PORTFOLIO_DATA.profile.linkedin}`,
          `  GitHub:   ${PORTFOLIO_DATA.profile.github}`
        ];
        logType = 'cyan';
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        outputLines = [
          `zsh: command not found: ${raw}`,
          'Type "help" to view valid commands.'
        ];
        logType = 'error';
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: raw,
        output: outputLines,
        type: logType
      }
    ]);
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#03070d]/85 backdrop-blur-md">
      <div 
        className={`wireframe-box flex flex-col rounded-xl border border-[#00F5FF]/40 bg-[#040812] shadow-[0_25px_80px_rgba(0,0,0,0.9)] transition-all ${
          isExpanded ? 'w-full h-full max-w-none' : 'w-full max-w-4xl h-[620px]'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#070e1c] rounded-t-xl select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <div className="h-4 w-px bg-slate-700 mx-1" />
            <TerminalIcon size={14} className="text-[#00F5FF]" />
            <span className="font-mono text-xs font-bold text-slate-200">
              hein@devops-node:~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playCyberClick();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
              title={isExpanded ? 'Restore window size' : 'Expand window'}
            >
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={() => {
                playCyberClick();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="Close terminal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#02050a] border-b border-slate-800/80 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-mono text-slate-500 mr-1">RUN:</span>
          {['help', 'status', 'kubectl get pods', 'docker ps', 'whoami', 'skills', 'certs', 'ping wavemoney.com', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleExecute(cmd)}
              className="px-2 py-0.5 rounded font-mono text-[11px] bg-slate-900 hover:bg-[#00F5FF]/15 text-slate-300 hover:text-[#00F5FF] border border-slate-800 hover:border-[#00F5FF]/30 transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Output Area */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 bg-[#03060e] text-slate-300">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[#00FF87]">hein@devops-node:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
              </div>
              <div className={`pl-4 space-y-0.5 leading-relaxed ${
                log.type === 'error' ? 'text-red-400' :
                log.type === 'success' ? 'text-[#00FF87]' :
                log.type === 'cyan' ? 'text-[#00F5FF]' : 'text-slate-300'
              }`}>
                {log.output.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">{line}</div>
                ))}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-[#070e1c] rounded-b-xl flex items-center gap-2 font-mono text-xs">
          <span className="text-[#00FF87] font-bold">hein@devops-node:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'status', 'kubectl', 'whoami')..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-slate-600 focus:ring-0"
            autoFocus
          />
          <button
            onClick={() => handleExecute(inputVal)}
            className="px-2.5 py-1 rounded bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] hover:bg-[#00F5FF]/20 flex items-center gap-1 font-mono text-[11px]"
          >
            <span>EXECUTE</span>
            <CornerDownLeft size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
