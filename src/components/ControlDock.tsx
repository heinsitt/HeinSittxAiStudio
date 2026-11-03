import React, { useState } from 'react';
import { 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Layers, 
  Palette, 
  RotateCcw,
  Sparkles,
  Camera
} from 'lucide-react';
import { playCyberClick } from '../utils/audio';

interface ControlDockProps {
  currentSection: number;
  onSetSection: (index: number) => void;
  wireframeOnly: boolean;
  onToggleWireframe: () => void;
  neonTheme: 'cyan' | 'purple' | 'green';
  onSetNeonTheme: (theme: 'cyan' | 'purple' | 'green') => void;
  orbitMode: boolean;
  onToggleOrbit: () => void;
  zenMode: boolean;
  onToggleZen: () => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  currentSection,
  onSetSection,
  wireframeOnly,
  onToggleWireframe,
  neonTheme,
  onSetNeonTheme,
  orbitMode,
  onToggleOrbit,
  zenMode,
  onToggleZen
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const viewPresets = [
    { label: 'OVERVIEW', index: 0 },
    { label: 'PROFILE', index: 1 },
    { label: 'NOC RACK', index: 2 },
    { label: 'STACK MATRIX', index: 3 },
    { label: 'ISOMETRIC', index: 4 },
    { label: 'CERTS', index: 5 },
    { label: 'UPLINK', index: 6 }
  ];

  return (
    <div 
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[940px] px-3 transition-transform duration-500 ease-out ${
        isCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
      }`}
    >
      {/* Toggle Tab Button attached to top center */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => {
            playCyberClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="px-3 py-1 rounded-t-md border-t border-x border-[#00F5FF]/30 bg-[#070d18]/90 text-[10px] font-mono font-bold text-[#00F5FF] tracking-wider flex items-center gap-1.5 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] hover:bg-[#00F5FF]/10 transition-colors"
        >
          {isCollapsed ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          <span>{isCollapsed ? 'SHOW 3D CONTROLS' : 'HIDE CONTROLS [H]'}</span>
        </button>
      </div>

      {/* Main Dock Container */}
      <div className="p-3 sm:p-4 rounded-xl border border-[#00F5FF]/25 bg-[#050b16]/90 shadow-[0_15px_50px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: View Presets Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
          <div className="flex items-center gap-1 text-slate-400 mr-2 shrink-0 text-[10px]">
            <Camera size={13} className="text-[#00F5FF]" />
            <span className="hidden sm:inline">VIEW:</span>
          </div>
          {viewPresets.map((preset) => {
            const isActive = currentSection === preset.index;
            return (
              <button
                key={preset.index}
                onClick={() => {
                  playCyberClick();
                  onSetSection(preset.index);
                }}
                className={`px-2.5 py-1 rounded text-[11px] shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#00F5FF] text-[#03070d] font-bold shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Right: Architectural Modifiers */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {/* Wireframe toggle */}
          <button
            onClick={() => {
              playCyberClick();
              onToggleWireframe();
            }}
            title="Toggle Wireframe Shell"
            className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1.5 border transition-all ${
              wireframeOnly
                ? 'border-[#00F5FF] bg-[#00F5FF]/15 text-[#00F5FF]'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span className="hidden sm:inline">WIREFRAME</span>
          </button>

          {/* Free Orbit Mode toggle */}
          <button
            onClick={() => {
              playCyberClick();
              onToggleOrbit();
            }}
            title="Enable Free 360° Drag & Orbit"
            className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1.5 border transition-all ${
              orbitMode
                ? 'border-[#00FF87] bg-[#00FF87]/15 text-[#00FF87]'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Compass size={13} />
            <span className="hidden sm:inline">FREE ORBIT</span>
          </button>

          {/* Neon Palette Switcher */}
          <div className="flex items-center gap-1 p-1 rounded bg-slate-900 border border-slate-800">
            <Palette size={12} className="text-slate-400 mx-1" />
            {(['cyan', 'purple', 'green'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  playCyberClick();
                  onSetNeonTheme(t);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  t === 'cyan' ? 'bg-[#00F5FF]' : t === 'purple' ? 'bg-[#A855F7]' : 'bg-[#00FF87]'
                } ${
                  neonTheme === t ? 'border-white scale-110 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title={`Set Neon ${t.toUpperCase()} Theme`}
              />
            ))}
          </div>

          {/* Zen / Full 3D Mode */}
          <button
            onClick={() => {
              playCyberClick();
              onToggleZen();
            }}
            title={zenMode ? 'Exit Zen Mode' : 'Enter Zen 3D Inspection Mode'}
            className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1.5 border transition-all ${
              zenMode
                ? 'border-[#A855F7] bg-[#A855F7]/15 text-[#A855F7]'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Eye size={13} />
            <span className="hidden sm:inline">{zenMode ? 'EXIT ZEN' : 'ZEN 3D'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
