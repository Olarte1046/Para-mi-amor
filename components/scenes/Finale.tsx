'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PikminSvg from '../pikmin/PikminSvg';
import { synth } from '../../lib/audio';
import { Heart } from 'lucide-react';

export interface FinaleProps {
    userType: 'red' | 'yellow' | 'blue';
    userAccessory: 'leaf' | 'bud' | 'flower';
}

export default function Finale({ userType, userAccessory }: FinaleProps) {
    const [accepted, setAccepted] = useState(false);

    const handleAccept = () => {
        setAccepted(true);
        if (synth) {
            // Play celebratory chime chord sound
            synth.playChime();

            // Let's schedule a little happy sequence chime!
            setTimeout(() => {
                if (synth) synth.playChime();
            }, 180);
            setTimeout(() => {
                if (synth) synth.playChime();
            }, 360);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-0 text-center select-none overflow-hidden bg-gradient-to-b from-[#120713] to-[#040105]">

            {/* Background soft particles (twilight forest fireflies) */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-pink-400 animate-ping duration-1000" />
                <div className="absolute top-[40%] right-[20%] w-2.5 h-2.5 rounded-full bg-rose-300 animate-ping duration-700" />
                <div className="absolute bottom-[50%] left-[45%] w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse duration-1000" />
            </div>

            <div className="max-w-md w-full z-20 pointer-events-auto flex flex-col items-center">

                <AnimatePresence mode="wait">
                    {!accepted ? (
                        <motion.div
                            key="proposal-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center bg-stone-900/50 border border-stone-850 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl"
                        >
                            {/* Little vector ornament dec */}
                            <div className="mb-4">
                                <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
                            </div>

                            <h2 className="font-handwriting text-stone-100 text-3xl md:text-4xl leading-tight mb-4">
                                El final del sendero
                            </h2>

                            <p className="font-sans text-stone-300 text-sm leading-relaxed mb-6 px-1">
                                Cada foto y cada recuerdo nos han traído hasta aquí. Han sido casi 10 meses maravillosos
                                donde hemos aprendido, rodado bajo la lluvia y reído juntos en cada parada.
                            </p>

                            <p className="font-sans text-stone-300 text-sm leading-relaxed mb-8 px-1">
                                Este bosque ha guardado nuestra historia, pero ahora nos toca dar el paso siguiente en nuestro camino.
                            </p>

                            {/* Proposal question */}
                            <div className="border-t border-stone-800/80 pt-6 w-full mb-8">
                                <span className="font-handwriting text-2xl md:text-3xl text-rose-300 tracking-wide block mb-1">
                                    ¿Quieres ser mi pareja?
                                </span>
                                <span className="font-sans text-[10px] text-stone-500 uppercase tracking-widest block mt-2">
                                    (Para caminar y rodar juntos oficialmente)
                                </span>
                            </div>

                            {/* Response buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                <motion.button
                                    onClick={handleAccept}
                                    className="py-3 px-6 bg-rose-800 hover:bg-rose-700 text-rose-50 rounded-xl font-sans font-medium tracking-wide shadow-md transition-colors cursor-pointer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Sí, claro que sí ❤️
                                </motion.button>

                                <motion.button
                                    onClick={handleAccept}
                                    className="py-3 px-6 bg-emerald-800 hover:bg-emerald-700 text-emerald-50 rounded-xl font-sans font-medium tracking-wide shadow-md transition-colors cursor-pointer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    ¡Obviamente sí! ✨
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="accepted-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                            className="flex flex-col items-center bg-stone-900/60 border border-rose-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl"
                        >
                            {/* Happy pulsing heart */}
                            <motion.div
                                className="mb-8"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                            >
                                <div className="relative">
                                    <Heart className="w-16 h-16 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]" />
                                    {/* Floating micro hearts */}
                                    <motion.div
                                        className="absolute -top-2 -right-2 text-rose-400 text-xs"
                                        animate={{ y: [-5, -25], opacity: [1, 0], scale: [0.8, 1.2] }}
                                        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                                    >
                                        ❤️
                                    </motion.div>
                                    <motion.div
                                        className="absolute -top-4 -left-3 text-pink-400 text-[10px]"
                                        animate={{ y: [-5, -20], opacity: [1, 0], scale: [0.7, 1.1] }}
                                        transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }}
                                    >
                                        💖
                                    </motion.div>
                                </div>
                            </motion.div>

                            <h2 className="font-handwriting text-rose-300 text-3xl md:text-4xl leading-tight mb-2">
                                ¡Nuestra mayor aventura!
                            </h2>

                            <p className="font-sans text-[11px] text-stone-400 tracking-wider uppercase mb-8">
                                El inicio de nuestro sendero oficial
                            </p>

                            {/* Two Pikmin sitting together */}
                            <div className="relative w-48 h-32 flex justify-center items-end bg-stone-950/40 border border-stone-850 rounded-2xl shadow-inner mb-6 px-4">
                                {/* Her Customized Pikmin */}
                                <div className="mr-2 transform translate-y-[8px]">
                                    <PikminSvg
                                        type={userType}
                                        accessory={userAccessory}
                                        isWalking={false}
                                        facingRight={true}
                                        width={70}
                                        height={85}
                                    />
                                </div>

                                {/* You (Rock Pikmin) sitting beside her */}
                                <div className="ml-2 transform translate-y-[8px]">
                                    <PikminSvg
                                        type="rock"
                                        accessory="flower"
                                        isWalking={false}
                                        facingRight={false}
                                        width={65}
                                        height={75}
                                    />
                                </div>
                            </div>

                            <p className="font-sans text-stone-200 text-sm leading-relaxed max-w-[280px]">
                                Gracias por estar en mi vida, por tu cariño sincero, tu estilo único y tus risas.
                                ¡Te amo muchísimo! ❤️
                            </p>

                            <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] font-mono text-stone-500">
                                <span>comenzando nuestra aventura juntos</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
