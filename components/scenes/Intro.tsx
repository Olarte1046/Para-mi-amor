'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PikminSvg from '../pikmin/PikminSvg';
import { synth } from '../../lib/audio';
import { Volume2, VolumeX } from 'lucide-react';

export interface IntroProps {
    onStart: (config: {
        type: 'red' | 'yellow' | 'blue';
        accessory: 'leaf' | 'bud' | 'flower';
        soundOn: boolean;
    }) => void;
}

export default function Intro({ onStart }: IntroProps) {
    const [step, setStep] = useState<'seed' | 'germinating' | 'customizing'>('seed');
    const [type, setType] = useState<'red' | 'yellow' | 'blue'>('red');
    const [accessory, setAccessory] = useState<'leaf' | 'bud' | 'flower'>('leaf');
    const [soundOn, setSoundOn] = useState(true);

    // Trigger sound test and start animation
    const handleSeedClick = () => {
        setStep('germinating');
        if (soundOn && synth) {
            synth.playChime();
        }

        // Animate seedling reveal after a delay
        setTimeout(() => {
            setStep('customizing');
        }, 1500);
    };

    const handleStart = () => {
        // Start background loops
        if (soundOn && synth) {
            synth.toggle(true);
        }
        onStart({ type, accessory, soundOn });
    };

    const toggleSound = () => {
        setSoundOn(!soundOn);
        if (!soundOn && synth) {
            synth.playChime();
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#111827] flex flex-col items-center justify-center overflow-hidden px-4 md:px-0 select-none z-50">

            {/* Twilight gradient atmospheric background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/70 via-[#111827]/90 to-[#0f172a]" />

            {/* Organic floating dust particles */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-emerald-400 rounded-full filter blur-xs animate-pulse" />
                <div className="absolute top-[60%] right-[15%] w-3.5 h-3.5 bg-yellow-400 rounded-full filter blur-xs animate-pulse duration-500" />
                <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-pink-400 rounded-full filter blur-[1px] animate-pulse duration-700" />
            </div>

            {/* Soundtrack Controls */}
            <div className="absolute top-6 right-6 pointer-events-auto">
                <button
                    onClick={toggleSound}
                    className="p-3.5 rounded-full border border-stone-800 bg-stone-900/60 hover:bg-stone-800 text-stone-300 transition-colors pointer-events-auto shadow-md"
                >
                    {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
            </div>

            <AnimatePresence mode="wait">

                {/* STEP 1: The Seed / Seedling Pot */}
                {step === 'seed' && (
                    <motion.div
                        key="seed-step"
                        className="flex flex-col items-center justify-center text-center max-w-md pointer-events-auto"
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="font-handwriting text-stone-100 text-4xl md:text-5xl leading-tight tracking-wide mb-2">
                            Para mi amor preciosa
                        </h1>
                        <p className="font-sans text-xs text-stone-400 tracking-wider uppercase mb-16 max-w-[280px]">
                            Una pequeña caminata de recuerdos y complicidad
                        </p>

                        {/* Tap target - Pot with Seed */}
                        <motion.div
                            onClick={handleSeedClick}
                            className="relative cursor-pointer group flex flex-col items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Seed Sprout (Sways gently) */}
                            <motion.div
                                className="w-8 h-12 origin-bottom mb-[-8px]"
                                animate={{ rotate: [-4, 4, -4] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                            >
                                <svg viewBox="0 0 40 60" className="w-full h-full fill-emerald-500">
                                    {/* Stem */}
                                    <path d="M 20 60 C 20 40 24 30 20 18" fill="none" stroke="#4d7c0f" strokeWidth="2.5" />
                                    {/* Leaf */}
                                    <path d="M 20 18 C 30 10 38 12 32 22 C 26 26 22 22 20 18 Z" fill="#22c55e" />
                                </svg>
                            </motion.div>

                            {/* Pot */}
                            <svg viewBox="0 0 60 50" className="w-20 h-20 fill-amber-800 stroke-amber-950 stroke-2">
                                <path d="M 5 10 L 55 10 L 45 45 L 15 45 Z" />
                                <rect x="2" y="4" width="56" height="6" rx="2" fill="#78350f" />
                                <ellipse cx="30" cy="45" rx="10" ry="1.5" fill="#451a03" />
                            </svg>

                            {/* Glowing Pulse Rings */}
                            <div className="absolute inset-0 scale-150 rounded-full border border-emerald-500/10 animate-ping opacity-75 pointer-events-none" />

                            <span className="mt-8 text-stone-300 font-sans text-sm tracking-wide bg-stone-900/40 border border-stone-800 px-4 py-2 rounded-full cursor-pointer hover:bg-stone-850 hover:text-white transition-all shadow-sm">
                                Desenterrar semilla
                            </span>
                        </motion.div>
                    </motion.div>
                )}

                {/* STEP 2: Germinating Animation */}
                {step === 'germinating' && (
                    <motion.div
                        key="germinating-step"
                        className="flex flex-col items-center justify-center text-center"
                        exit={{ opacity: 0 }}
                    >
                        {/* Shaking Sprout */}
                        <motion.div
                            animate={{
                                x: [-4, 4, -4, 4, -2, 2, 0],
                                rotate: [-8, 8, -8, 8, -4, 4, 0]
                            }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="w-24 h-24 mb-6"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-400">
                                {/* Sprout breaking open */}
                                <path d="M 50 80 C 40 60 30 40 50 15 C 70 40 60 60 50 80" />
                                <path d="M 50 15 C 38 18 35 5 45 10 Z" fill="#4ade80" />
                                <path d="M 50 15 C 62 18 65 5 55 10 Z" fill="#86efac" />
                            </svg>
                        </motion.div>
                        <p className="font-sans text-stone-400 text-xs tracking-widest uppercase animate-pulse">
                            Germinando recuerdos...
                        </p>
                    </motion.div>
                )}

                {/* STEP 3: Customize Pikmin */}
                {step === 'customizing' && (
                    <motion.div
                        key="custom-step"
                        className="flex flex-col items-center max-w-md w-full text-center pointer-events-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <h2 className="font-handwriting text-stone-100 text-3xl leading-snug mb-2">
                            ¡Ha nacido tu Pikmin!
                        </h2>
                        <p className="font-sans text-[11px] text-stone-400 tracking-wider uppercase mb-8">
                            Personaliza tu personaje explorador
                        </p>

                        {/* Interactive Pikmin Preview */}
                        <div className="relative w-40 h-40 flex items-center justify-center bg-stone-950/60 rounded-full border border-stone-850 shadow-inner mb-6">
                            <PikminSvg
                                type={type === 'red' ? 'red' : type === 'yellow' ? 'yellow' : 'blue'}
                                accessory={accessory}
                                isWalking={false}
                                facingRight={true}
                                width={120}
                                height={140}
                                className="drop-shadow-[0_4px_15px_rgba(255,255,255,0.05)]"
                            />
                        </div>

                        {/* Customizer Panel */}
                        <div className="w-full bg-stone-900/60 border border-stone-850 rounded-2xl p-5 mb-8">
                            {/* Type Switcher */}
                            <div className="mb-5 text-left">
                                <span className="font-sans text-[10px] text-stone-500 uppercase tracking-widest font-semibold block mb-2.5">
                                    1. Elige tu especie
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['red', 'yellow', 'blue'] as const).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={`py-2 px-3 text-xs font-sans rounded-lg border transition-all text-center capitalize ${type === t
                                                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium'
                                                    : 'bg-stone-950/60 border-stone-850 hover:border-stone-700 text-stone-400'
                                                }`}
                                        >
                                            {t === 'red' ? 'Rojo 🔴' : t === 'yellow' ? 'Amarillo 🟡' : 'Azul 🔵'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accessory Switcher */}
                            <div className="text-left">
                                <span className="font-sans text-[10px] text-stone-500 uppercase tracking-widest font-semibold block mb-2.5">
                                    2. Elige tu brote
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['leaf', 'bud', 'flower'] as const).map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setAccessory(a)}
                                            className={`py-2 px-3 text-xs font-sans rounded-lg border transition-all text-center capitalize ${accessory === a
                                                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium'
                                                    : 'bg-stone-950/60 border-stone-850 hover:border-stone-700 text-stone-400'
                                                }`}
                                        >
                                            {a === 'leaf' ? 'Hoja 🍃' : a === 'bud' ? 'Capullo 🌸' : 'Flor 🌼'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Confirm Start Button */}
                        <motion.button
                            onClick={handleStart}
                            className="w-full py-3.5 bg-[#4A7C59] hover:bg-[#5b966c] text-[#f7fee7] rounded-xl font-sans font-medium tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Comenzar expedición
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
