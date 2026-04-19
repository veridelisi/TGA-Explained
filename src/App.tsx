/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Wallet, 
  Building2, 
  Landmark, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Repeat, 
  PlusCircle, 
  Zap 
} from 'lucide-react';

// --- Types ---
interface Scene {
  id: number;
  title: string;
  time: string;
  voiceover: string;
  hook?: boolean;
  punchline?: boolean;
}

const SCENES: Scene[] = [
  {
    id: 0,
    title: "The Hook",
    time: "0:00 – 0:05",
    voiceover: "“Government spending does NOT create new money.”",
    hook: true
  },
  {
    id: 1,
    title: "TGA Basics",
    time: "0:05 – 0:12",
    voiceover: "“The Treasury has an account at the Fed — the TGA. It’s just a payment account.”"
  },
  {
    id: 2,
    title: "Spending Flow",
    time: "0:12 – 0:22",
    voiceover: "“When the Treasury spends, money leaves the TGA… and goes into bank accounts. But nothing new is created.”"
  },
  {
    id: 3,
    title: "Taxes & Bonds",
    time: "0:22 – 0:32",
    voiceover: "“When taxes are paid, money goes back to the TGA. When bonds are issued, money moves into the TGA.”"
  },
  {
    id: 4,
    title: "Redistribution",
    time: "0:32 – 0:45",
    voiceover: "“These are just shifts between accounts. The total amount of money doesn’t increase. Spending, taxes, and borrowing only redistribute existing money.”"
  },
  {
    id: 5,
    title: "Money Creation",
    time: "0:45 – 0:55",
    voiceover: "“Real money creation happens in banks — when loans create new deposits. The balance sheet expands.”"
  },
  {
    id: 6,
    title: "Relative Scale",
    time: "0:55 – 1:05",
    voiceover: "“Scale matters: The TGA holds about $751 billion, but commercial bank deposits total over $19 trillion.”"
  },
  {
    id: 7,
    title: "The 90/10 Split",
    time: "1:05 – 1:15",
    voiceover: "“The government creates only about 10% of the money supply (cash). Banks create the other 90%.”"
  },
  {
    id: 8,
    title: "Final Truth",
    time: "1:15 – 1:20",
    voiceover: "“The Treasury moves money. Banks create it.”",
    punchline: true
  }
];

// --- Components ---

const MoneyParticle = ({ start, end, duration = 1.5, delay = 0 }: { start: {x: number, y: number}, end: {x: number, y: number}, duration?: number, delay?: number }) => (
  <motion.div
    initial={start}
    animate={end}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.6)] z-10"
  />
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep === SCENES.length - 1) {
      setCurrentStep(0);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, SCENES.length - 1));
    }
  };
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-bg font-sans text-text-main flex flex-col overflow-hidden h-screen">
      {/* Navigation Header - Professional Polish Style */}
      <header className="h-20 bg-primary text-white flex items-center justify-between px-10 border-b-4 border-accent-bank shrink-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Treasury General Account & Money Creation</h1>
          <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Monetary Policy Explainer Series</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-white/10 px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-widest border border-white/5">
            Step {currentStep + 1} of {SCENES.length}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="p-2 rounded hover:bg-white/10 disabled:opacity-30 transition-all border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextStep}
              className="p-2 rounded bg-accent-bank hover:bg-accent-bank/80 transition-all shadow-lg border border-white/10"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-[320px_1fr] gap-5 p-5 overflow-hidden">
        {/* Sidebar Timeline - Professional Polish Style */}
        <aside className="bg-pane border border-border-ui rounded-lg p-5 flex flex-col gap-4 overflow-y-auto pane-shadow">
          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2 border-b border-border-ui pb-2">
            Presentation Timeline
          </div>
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setCurrentStep(idx)}
              className={`text-left p-3 rounded-md transition-all border-l-4 ${
                currentStep === idx 
                ? 'bg-bg border-accent-bank' 
                : 'border-transparent hover:bg-bg/50'
              }`}
            >
              <span className={`block text-[10px] font-bold mb-1 ${currentStep === idx ? 'text-accent-bank' : 'text-text-muted'}`}>
                {scene.time}
              </span>
              <strong className="block text-sm font-bold text-text-main mb-1">
                {scene.title}
              </strong>
              <p className="text-[11px] text-text-muted line-clamp-2 leading-tight">
                {scene.voiceover.slice(0, 60)}...
              </p>
            </button>
          ))}
          
          <div className="mt-auto pt-4 border-t border-border-ui text-[10px] text-text-muted leading-relaxed">
            Use <kbd className="px-1 bg-bg border border-border-ui rounded">Space</kbd> or <kbd className="px-1 bg-bg border border-border-ui rounded">→</kbd> to advance
          </div>
        </aside>

        {/* Visualization Canvas - Professional Polish Style */}
        <section className="bg-pane border border-border-ui rounded-lg p-10 flex flex-col relative pane-shadow overflow-hidden">
          {/* Top Status Indicators */}
          <div className="flex justify-between items-start mb-8 z-30">
            <AnimatePresence mode="wait">
              {SCENES[currentStep].hook && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="bg-accent-alert text-white px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 shadow-lg"
                >
                  <span className="text-lg">✕</span> Money Printer: WRONG
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-right">
              <h2 className={`text-3xl font-bold tracking-tight mb-2 ${SCENES[currentStep].hook ? 'text-accent-alert' : 'text-primary'}`}>
                {SCENES[currentStep].voiceover.replace(/[“”]/g, '')}
              </h2>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Visualization currentStep={currentStep} />
          </div>

          {/* Conclusion Footer - Professional Polish style */}
          <div className="h-24 border-t border-border-ui flex justify-center items-center gap-16 mt-6 pt-2 shrink-0">
                <div className="text-center">
                  <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Government Action</span>
                  <span className="block text-2xl font-black text-primary">REDISTRIBUTE</span>
                </div>
                <div className="text-4xl font-bold text-accent-bank opacity-30">≠</div>
                <div className="text-center">
                  <span className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Private Banking</span>
                  <span className="block text-2xl font-black text-accent-bank">MONEY CREATION</span>
                </div>
          </div>
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{ 
              backgroundImage: `linear-gradient(var(--color-border-ui) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-ui) 1px, transparent 1px)`,
              backgroundSize: '40px 40px' 
            }} 
          />
        </section>
      </main>
    </div>
  );
}

function Visualization({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center gap-16">
      <AnimatePresence mode="wait">
        {currentStep === 0 && <InitialHookView key="v0" />}
        {currentStep === 1 && <TgaBasicsView key="v1" />}
        {currentStep === 2 && <SpendingView key="v2" />}
        {currentStep === 3 && <TaxesBondsView key="v3" />}
        {currentStep === 4 && <CoreArgumentView key="v4" />}
        {currentStep === 5 && <RealCreationView key="v5" />}
        {currentStep === 6 && <ScaleComparisonView key="v6" />}
        {currentStep === 7 && <RatioSplitView key="v7" />}
        {currentStep === 8 && <PunchlineView key="v8" />}
      </AnimatePresence>
    </div>
  );
}

// --- Scene Views ---

function InitialHookView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="relative">
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="p-10 bg-white shadow-2xl rounded-xl border-4 border-accent-alert/20"
        >
          <Zap className="w-32 h-32 text-accent-alert" />
        </motion.div>
        <div className="absolute -top-4 -right-4 bg-accent-alert text-white font-black px-6 py-3 rounded-md transform rotate-6 shadow-xl ring-4 ring-white uppercase tracking-tighter text-xl">
          WRONG
        </div>
      </div>
      <div className="text-center font-bold text-text-muted uppercase tracking-[0.3em] text-xs">
        THE CONVENTIONAL MYTH
      </div>
    </motion.div>
  );
}

function TgaBasicsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center"
    >
      <div className="entity-box w-[240px] h-[320px] bg-pane border-2 border-accent-gov rounded-xl p-8 flex flex-col items-center justify-between shadow-xl">
        <div className="text-center">
            <h3 className="font-bold text-accent-gov uppercase tracking-widest text-[10px] mb-1">Fiscal Authority</h3>
            <div className="h-px w-8 bg-accent-gov/20 mx-auto" />
        </div>
        
        {/* The Bucket Icon from Design HTML */}
        <div className="w-24 h-24 border-x-4 border-b-4 border-accent-gov rounded-b-3xl relative overflow-hidden bg-bg/30">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: '65%' }}
              className="w-full bg-accent-gov/20 absolute bottom-0 left-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Landmark className="text-accent-gov w-10 h-10 opacity-40" />
            </div>
        </div>
        
        <div className="text-center">
            <div className="font-black text-4xl text-primary tracking-tighter">TGA</div>
            <div className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-widest">Treasury Gen. Account</div>
        </div>
      </div>
    </motion.div>
  );
}

function SpendingView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-around"
    >
      {/* TGA Side */}
      <div className="entity-box w-[180px] h-[240px] bg-bg/50 border-2 border-accent-gov rounded-lg flex flex-col items-center justify-center gap-4 shadow-md">
        <div className="w-16 h-16 border-x-2 border-b-2 border-accent-gov rounded-b-xl relative bg-white overflow-hidden">
             <div className="w-full h-[30%] bg-accent-gov/20 absolute bottom-0" />
        </div>
        <div className="text-primary font-bold text-sm tracking-widest uppercase">TGA</div>
      </div>

      <div className="relative flex-1 flex flex-col items-center">
        <div className="w-full h-1 bg-border-ui relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-t-4 border-r-4 border-border-ui rotate-45" />
            <MoneyParticle start={{ x: -100, y: 0 }} end={{ x: 100, y: 0 }} />
        </div>
        <div className="mt-4 bg-pane px-4 py-2 border border-border-ui rounded text-[10px] font-bold text-text-muted uppercase tracking-widest">
            SPENDING TRANSFER
        </div>
      </div>

      {/* Banks Side */}
      <div className="entity-box w-[180px] h-[240px] bg-pane border-2 border-accent-bank rounded-lg flex flex-col items-center justify-center gap-4 shadow-md">
        <div className="w-16 h-16 bg-accent-bank rounded flex items-center justify-center shadow-lg">
            <Building2 className="text-white w-8 h-8" />
        </div>
        <div className="text-accent-bank font-bold text-sm tracking-widest uppercase">Banks</div>
      </div>
    </motion.div>
  );
}

function TaxesBondsView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-around"
    >
      {/* Banking Sector Side */}
      <div className="entity-box w-[180px] h-[240px] bg-pane border-2 border-accent-bank rounded-lg flex flex-col items-center justify-center gap-4 shadow-md">
        <div className="grid grid-cols-2 gap-1 px-4">
            {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 bg-bg rounded flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-accent-bank opacity-60" />
                </div>
            ))}
        </div>
        <div className="text-accent-bank font-bold text-[10px] tracking-widest uppercase">Banking Sector</div>
      </div>

      <div className="relative flex-1 flex flex-col items-center">
        <div className="w-full h-1 bg-border-ui/50 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-t-4 border-r-4 border-border-ui rotate-45" />
            <MoneyParticle start={{ x: -100, y: 0 }} end={{ x: 100, y: 0 }} />
        </div>
        <div className="mt-4 bg-pane px-4 py-2 border border-border-ui rounded text-[10px] font-bold text-text-muted uppercase tracking-widest">
            TAXES / BOND REVENUE
        </div>
      </div>

      {/* TGA Side */}
      <div className="entity-box w-[180px] h-[240px] bg-bg/50 border-2 border-accent-gov rounded-lg flex flex-col items-center justify-center gap-4 shadow-md">
        <div className="w-16 h-16 border-x-2 border-b-2 border-accent-gov rounded-b-xl relative bg-white overflow-hidden">
             <motion.div animate={{ height: ['30%', '60%', '30%'] }} transition={{ duration: 4, repeat: Infinity }} className="w-full bg-accent-gov/20 absolute bottom-0" />
        </div>
        <div className="text-primary font-bold text-sm tracking-widest uppercase">TGA</div>
      </div>
    </motion.div>
  );
}

function CoreArgumentView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center gap-12"
    >
      <div className="flex gap-20 items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-40 bg-bg border-2 border-accent-gov rounded-xl flex flex-col items-center justify-center gap-2">
                <Landmark className="text-accent-gov w-10 h-10" />
                <span className="text-[10px] font-bold text-primary">TGA</span>
            </div>
          </div>
          
          <motion.div 
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <Repeat className="w-10 h-10 text-accent-bank opacity-50" />
            <div className="px-4 py-2 bg-accent-bank/5 border border-accent-bank/20 rounded-md text-[10px] font-bold text-accent-bank uppercase tracking-[0.2em] whitespace-nowrap">
                Zero Net Creation
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-40 bg-pane border-2 border-accent-bank rounded-xl flex flex-col items-center justify-center gap-2">
                <Building2 className="text-accent-bank w-10 h-10" />
                <span className="text-[10px] font-bold text-accent-bank uppercase tracking-tighter">Private Banks</span>
            </div>
          </div>
      </div>

      <div className="text-center max-w-lg bg-bg border border-border-ui p-6 rounded-lg pane-shadow">
          <p className="text-xs font-bold text-text-muted leading-relaxed uppercase tracking-widest">
            Accounting Shift: No New Money is Injected or Removed from the Aggregate System by these Operations.
          </p>
      </div>
    </motion.div>
  );
}

function RealCreationView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-10 w-full max-w-lg"
    >
      <div className="w-full bg-pane border-2 border-accent-bank rounded-2xl p-8 pane-shadow relative overflow-hidden">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-border-ui">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-bank rounded flex items-center justify-center">
                    <Building2 className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-primary uppercase">Commercial Banking System</span>
                    <span className="text-[10px] text-text-muted">Private Sector Balance Sheet</span>
                </div>
            </div>
            <div className="bg-accent-bank/10 text-accent-bank text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Creating Now</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Assets</div>
                <div className="bg-bg p-4 rounded-lg flex items-center justify-between border border-border-ui">
                    <span className="text-[11px] font-mono">LOANS</span>
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs font-bold text-accent-bank">+</motion.span>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Liabilities</div>
                <div className="bg-bg p-4 rounded-lg flex items-center justify-between border border-border-ui">
                    <span className="text-[11px] font-mono">DEPOSITS</span>
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="text-xs font-bold text-accent-bank">NEW</motion.span>
                </div>
            </div>
        </div>

        <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-10 py-4 bg-accent-bank text-white rounded-lg text-center font-bold text-sm tracking-widest uppercase shadow-xl"
        >
            Balance Sheet Expansion
        </motion.div>
      </div>
      <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">Engine of Economic Growth</div>
    </motion.div>
  );
}

function ScaleComparisonView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-12 w-full max-w-2xl px-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end w-full">
        {/* TGA Scale */}
        <div className="flex flex-col items-center gap-4">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Treasury Balance</div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 40 }}
              className="w-full bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center p-4 relative"
            >
                <div className="font-bold text-primary text-xs tracking-tighter">$751 BILLION</div>
            </motion.div>
            <div className="text-[10px] font-bold text-primary italic">"Small Payment Account"</div>
        </div>

        {/* Banks Scale */}
        <div className="flex flex-col items-center gap-4">
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Commercial Deposits</div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 320 }}
              className="w-full bg-accent-bank border-2 border-white/20 rounded-lg flex flex-col items-center justify-center p-8 relative shadow-2xl"
            >
                <Building2 className="text-white/20 w-16 h-16 absolute top-4 right-4" />
                <div className="font-black text-white text-5xl tracking-tighter">$19</div>
                <div className="font-bold text-white text-xl uppercase tracking-widest">TRILLION</div>
            </motion.div>
            <div className="text-[10px] font-bold text-accent-bank italic">"Large Deposit Base"</div>
        </div>
      </div>
      
      <div className="bg-bg p-6 rounded-lg text-center border border-border-ui w-full">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">The Scale Difference: ~25x</p>
      </div>
    </motion.div>
  );
}

function RatioSplitView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-12 w-full max-w-lg"
    >
      <div className="w-full space-y-8">
        <div className="text-center">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-[0.4em] mb-4">Money Supply Origin</h3>
            <div className="h-px w-full bg-border-ui" />
        </div>

        <div className="bg-pane border border-border-ui rounded-2xl overflow-hidden shadow-xl">
            <div className="flex h-32">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '10%' }}
                  className="bg-primary flex items-center justify-center relative group"
                >
                    <span className="text-white font-black text-xl">10%</span>
                    <div className="absolute top-full mt-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-px h-4 bg-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase whitespace-nowrap">Cash</span>
                    </div>
                </motion.div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '90%' }}
                  className="bg-accent-bank border-l-2 border-white/20 flex items-center justify-center relative group"
                >
                    <span className="text-white font-black text-4xl">90%</span>
                    <div className="absolute top-full mt-4 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-px h-4 bg-accent-bank" />
                        <span className="text-[10px] font-bold text-accent-bank uppercase whitespace-nowrap">Private Bank Deposits</span>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="text-[10px] font-bold text-primary uppercase mb-1">Government Created</h4>
                <p className="text-lg font-bold text-text-main">$2.4T Est.</p>
            </div>
            <div className="p-4 bg-accent-bank/5 rounded-lg border border-accent-bank/10">
                <h4 className="text-[10px] font-bold text-accent-bank uppercase mb-1">Bank Created</h4>
                <p className="text-lg font-bold text-text-main">$19T+ Est.</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function PunchlineView() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-12 w-full h-full"
    >
        <div className="grid grid-cols-2 gap-10 w-full max-w-2xl px-10">
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-pane border-2 border-accent-gov p-10 rounded-[2rem] flex flex-col items-center gap-6 text-center pane-shadow"
            >
                <div className="w-20 h-20 bg-bg border-x-4 border-b-4 border-accent-gov rounded-b-2xl relative overflow-hidden flex items-center justify-center">
                    <Repeat className="w-10 h-10 text-accent-gov opacity-20" />
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-text-muted mb-2 uppercase tracking-widest">Government</h4>
                    <p className="text-4xl font-black text-primary tracking-tighter uppercase">MOVES IT</p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="bg-accent-bank p-10 rounded-[2rem] flex flex-col items-center gap-6 text-center shadow-2xl relative border-4 border-white/20"
            >
                <div className="absolute top-4 right-4 text-white/20">
                    <PlusCircle className="w-8 h-8" />
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                    <Building2 className="w-12 h-12 text-white" />
                </div>
                <div className="text-white">
                    <h4 className="text-[10px] font-bold opacity-60 mb-2 uppercase tracking-widest">Banks</h4>
                    <p className="text-4xl font-black tracking-tighter uppercase">CREATE IT</p>
                </div>
            </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-4 text-primary"
        >
            <div className="h-px w-20 bg-current" />
            <span className="font-bold text-[10px] uppercase tracking-widest italic">Summary Completed</span>
            <div className="h-px w-20 bg-current" />
        </motion.div>
    </motion.div>
  );
}
