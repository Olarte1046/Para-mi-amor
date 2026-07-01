import React from 'react';
import { motion } from 'framer-motion';

export interface FoliageOverlayProps {
    type: 'leaves' | 'fern' | 'moss' | 'flower';
    isOpen: boolean;
}

export default function FoliageOverlay({ type, isOpen }: FoliageOverlayProps) {
    // Leaf spring animations
    const transition: any = {
        type: 'spring',
        stiffness: 90,
        damping: 18,
        mass: 0.8
    };

    if (type === 'leaves') {
        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 select-none">
                {/* Leaf 1 (Top Left) */}
                <motion.div
                    className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%]"
                    initial={{ rotate: 0, x: 0, y: 0 }}
                    animate={isOpen ? { rotate: -45, x: '-80%', y: '-60%' } : { rotate: 0, x: 0, y: 0 }}
                    transition={transition}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-800 stroke-emerald-950 stroke-[0.5]">
                        <path d="M 10 90 Q 50 10 90 10 C 60 40 70 80 10 90 Z" />
                        <path d="M 10 90 C 20 80 30 75 90 10" fill="none" stroke="#064e3b" strokeWidth="1" />
                        {/* Ribs */}
                        <path d="M 30 70 Q 45 55 55 58" fill="none" stroke="#064e3b" strokeWidth="0.8" />
                        <path d="M 45 55 Q 60 40 70 45" fill="none" stroke="#064e3b" strokeWidth="0.8" />
                    </svg>
                </motion.div>

                {/* Leaf 2 (Bottom Right) */}
                <motion.div
                    className="absolute -bottom-1/4 -right-1/4 w-[85%] h-[85%]"
                    initial={{ rotate: 0, x: 0, y: 0 }}
                    animate={isOpen ? { rotate: 50, x: '80%', y: '60%' } : { rotate: 0, x: 0, y: 0 }}
                    transition={transition}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-700 stroke-emerald-900 stroke-[0.5]">
                        <path d="M 90 10 Q 50 90 10 90 C 40 60 30 20 90 10 Z" />
                        <path d="M 90 10 C 80 20 70 25 10 90" fill="none" stroke="#064e3b" strokeWidth="1" />
                        {/* Ribs */}
                        <path d="M 70 30 Q 55 45 45 42" fill="none" stroke="#064e3b" strokeWidth="0.8" />
                        <path d="M 55 45 Q 40 60 30 55" fill="none" stroke="#064e3b" strokeWidth="0.8" />
                    </svg>
                </motion.div>

                {/* Small Leaf (Top Right Cover) */}
                <motion.div
                    className="absolute top-0 right-0 w-[45%] h-[45%]"
                    initial={{ rotate: 0, scale: 1, opacity: 1 }}
                    animate={isOpen ? { rotate: 90, x: '100%', y: '-10%', scale: 0.8, opacity: 0 } : { rotate: 0, scale: 1, opacity: 1 }}
                    transition={transition}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-600/90 stroke-emerald-900 stroke-[0.5]">
                        <path d="M 10 10 Q 90 50 90 90 C 60 70 20 60 10 10 Z" />
                    </svg>
                </motion.div>
            </div>
        );
    }

    if (type === 'fern') {
        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 select-none">
                {/* Left Fern Frond */}
                <motion.div
                    className="absolute -top-10 -left-16 w-[100%] h-[120%]"
                    initial={{ x: 0, rotate: -5 }}
                    animate={isOpen ? { x: '-90%', rotate: -30, opacity: 0 } : { x: 0, rotate: -5, opacity: 1 }}
                    transition={transition}
                >
                    <svg viewBox="0 0 100 150" className="w-full h-full fill-forest-600 stroke-emerald-900 stroke-[0.3]">
                        {/* Main stem */}
                        <path d="M 10 140 C 20 100 45 40 70 10" fill="none" stroke="#14532d" strokeWidth="2.5" />
                        {/* Leaf leaflets (pinnae) */}
                        <path d="M 22 120 C 5 110 -5 105 10 98 Q 20 102 24 115" fill="#15803d" />
                        <path d="M 28 100 C 10 90 0 85 20 78 Q 28 82 31 95" fill="#15803d" />
                        <path d="M 35 80 C 18 70 8 65 28 58 Q 35 62 37 75" fill="#15803d" />
                        <path d="M 42 60 C 28 50 18 45 35 38 Q 42 42 44 55" fill="#15803d" />
                        <path d="M 50 40 C 38 30 28 25 45 18 Q 50 22 52 35" fill="#15803d" />
                        {/* Right side leaflets */}
                        <path d="M 22 120 C 35 115 45 118 35 125 Q 26 122 22 120" fill="#166534" />
                        <path d="M 28 100 C 44 95 54 98 44 105 Q 32 102 28 100" fill="#166534" />
                        <path d="M 35 80 C 50 75 60 78 50 85 Q 39 82 35 80" fill="#166534" />
                        <path d="M 42 60 C 56 55 66 58 56 65 Q 46 62 42 60" fill="#166534" />
                    </svg>
                </motion.div>

                {/* Right Fern Frond */}
                <motion.div
                    className="absolute -bottom-10 -right-16 w-[100%] h-[120%]"
                    initial={{ x: 0, rotate: 5 }}
                    animate={isOpen ? { x: '90%', rotate: 30, opacity: 0 } : { x: 0, rotate: 5, opacity: 1 }}
                    transition={transition}
                >
                    <svg viewBox="0 0 100 150" className="w-full h-full fill-forest-700 stroke-emerald-900 stroke-[0.3]" style={{ transform: 'scaleX(-1)' }}>
                        <path d="M 10 140 C 20 100 45 40 70 10" fill="none" stroke="#14532d" strokeWidth="2.5" />
                        <path d="M 22 120 C 5 110 -5 105 10 98 Q 20 102 24 115" fill="#16a34a" />
                        <path d="M 28 100 C 10 90 0 85 20 78 Q 28 82 31 95" fill="#16a34a" />
                        <path d="M 35 80 C 18 70 8 65 28 58 Q 35 62 37 75" fill="#16a34a" />
                        <path d="M 42 60 C 28 50 18 45 35 38 Q 42 42 44 55" fill="#16a34a" />
                        {/* Right side leaflets */}
                        <path d="M 22 120 C 35 115 45 118 35 125 Q 26 122 22 120" fill="#14532d" />
                        <path d="M 28 100 C 44 95 54 98 44 105 Q 32 102 28 100" fill="#14532d" />
                        <path d="M 35 80 C 50 75 60 78 50 85 Q 39 82 35 80" fill="#14532d" />
                    </svg>
                </motion.div>
            </div>
        );
    }

    if (type === 'moss') {
        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 select-none bg-stone-900/40 backdrop-blur-[1px]">
                {/* Top cover block of soft moss/grass */}
                <motion.div
                    className="absolute inset-0 w-full h-[55%] origin-top bg-lime-900 border-b-4 border-lime-700"
                    initial={{ translateY: 0, skewY: 0 }}
                    animate={isOpen ? { translateY: '-101%', skewY: -5 } : { translateY: 0, skewY: 0 }}
                    transition={transition}
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at center, #3f6212 0%, #1a2e05 100%)',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    {/* Subtle moss chives */}
                    <div className="absolute bottom-1 left-4 w-6 h-4 border-l border-r border-lime-500 rounded-t-full opacity-60" />
                    <div className="absolute bottom-2 left-1/3 w-8 h-6 border-l border-indigo-400 rounded-t-full opacity-40" />
                    <div className="absolute bottom-1 right-12 w-6 h-5 border-l border-yellow-500 rounded-t-full opacity-50" />
                    <div className="absolute inset-x-0 bottom-0 text-center text-xs text-lime-400 font-sans tracking-widest uppercase py-1">
                        🌿 Musgo Fértil 🌿
                    </div>
                </motion.div>

                {/* Bottom cover block */}
                <motion.div
                    className="absolute bottom-0 inset-x-0 w-full h-[47%] origin-bottom bg-lime-950 border-t-4 border-lime-800"
                    initial={{ translateY: 0, skewY: 0 }}
                    animate={isOpen ? { translateY: '101%', skewY: 5 } : { translateY: 0, skewY: 0 }}
                    transition={transition}
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at center, #2e4a0d 0%, #162404 100%)',
                        boxShadow: '0 -4px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    <div className="absolute top-2 left-10 w-4 h-4 rounded-full bg-orange-700/80 filter blur-xs animate-pulse" />
                    <div className="absolute top-1 right-1/4 w-8 h-4 border-r border-yellow-300 rounded-t-full opacity-40" />
                    <div className="absolute inset-x-0 top-1 text-center text-[10px] text-lime-600 font-mono">
                        - cubierto por el tiempo -
                    </div>
                </motion.div>
            </div>
        );
    }

    // default to 'flower'
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 select-none">
            {/* Flower curtain - left side */}
            <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-emerald-950/80 border-r border-amber-500/20"
                initial={{ x: 0 }}
                animate={isOpen ? { x: '-101%' } : { x: 0 }}
                transition={transition}
            >
                {/* Flower SVG shapes */}
                <svg viewBox="0 0 50 100" className="absolute top-8 right-2 w-12 h-12 fill-rose-500">
                    <circle cx="25" cy="25" r="8" fill="#fde047" />
                    <ellipse cx="25" cy="11" rx="5" ry="8" />
                    <ellipse cx="25" cy="39" rx="5" ry="8" />
                    <ellipse cx="11" cy="25" rx="8" ry="5" />
                    <ellipse cx="39" cy="25" rx="8" ry="5" />
                </svg>
                <svg viewBox="0 0 50 100" className="absolute bottom-12 left-4 w-10 h-10 fill-amber-500">
                    <circle cx="25" cy="25" r="7" fill="#f43f5e" />
                    <circle cx="25" cy="13" r="6" />
                    <circle cx="25" cy="37" r="6" />
                    <circle cx="13" cy="25" r="6" />
                    <circle cx="37" cy="25" r="6" />
                </svg>
            </motion.div>

            {/* Flower curtain - right side */}
            <motion.div
                className="absolute top-0 right-0 w-1/2 h-full bg-emerald-950/80 border-l border-amber-500/20"
                initial={{ x: 0 }}
                animate={isOpen ? { x: '101%' } : { x: 0 }}
                transition={transition}
            >
                <svg viewBox="0 0 50 100" className="absolute top-20 left-2 w-11 h-11 fill-pink-400">
                    <circle cx="25" cy="25" r="8" fill="#fde047" />
                    <ellipse cx="25" cy="12" rx="4" ry="7" />
                    <ellipse cx="25" cy="38" rx="4" ry="7" />
                    <ellipse cx="12" cy="25" rx="7" ry="4" />
                    <ellipse cx="38" cy="25" rx="7" ry="4" />
                </svg>
                {/* Tiny instruction text */}
                <div className="absolute inset-0 flex items-center justify-center text-center p-3">
                    <div className="text-[10px] text-amber-200/80 uppercase font-sans tracking-widest px-2 py-1 rounded bg-black/40 border border-amber-400/20">
                        Encuéntralo
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
