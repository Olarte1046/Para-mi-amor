'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import PikminCharacters from '../pikmin/PikminCharacters';
import MemoryCard from './MemoryCard';
import { memories, scenes } from '../../lib/memories.data';
import { generateSvgPath } from '../../lib/path';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { synth } from '../../lib/audio';
import Finale from './Finale';
import { Fireflies, FallingLeaves } from '../decor/Decorators';

export interface ForestScrollProps {
    userType: 'red' | 'yellow' | 'blue';
    userAccessory: 'leaf' | 'bud' | 'flower';
}

export default function ForestScroll({ userType, userAccessory }: ForestScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [soundOn, setSoundOn] = useState(true);
    const [activeAct, setActiveAct] = useState<1 | 2 | 3>(1);
    const [completedMemories, setCompletedMemories] = useState<number[]>([]);

    // Hook scroll values
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Adding spring damping (easing with inertia)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 45,
        damping: 25,
        mass: 0.6
    });

    // Track scroll activity to update current Act and display triggers
    React.useEffect(() => {
        return scrollYProgress.on('change', (latest) => {
            // Act thresholds
            if (latest < 0.45) {
                setActiveAct(1);
            } else if (latest >= 0.45 && latest < 0.8) {
                setActiveAct(2);
            } else {
                setActiveAct(3);
            }
        });
    }, [scrollYProgress]);

    const toggleSound = () => {
        setSoundOn(!soundOn);
        if (synth) {
            synth.toggle(!soundOn);
        }
    };

    const handleRevealMemory = (id: number) => {
        if (!completedMemories.includes(id)) {
            setCompletedMemories((prev) => [...prev, id]);
        }
    };

    // Generate SVG path for the entire height of the scroll container
    const pathD = generateSvgPath(250);

    // Background sky transitions based on the active Act
    // Act I: soft daylight forest green/blue
    // Act II: deep forest twilight shady green
    // Act III: warm amber/rose twilight proposal clearing
    const bgClasses = {
        1: 'from-[#0d2a1d] via-[#091b13] to-[#040c09]',
        2: 'from-[#040c09] via-[#08131d] to-[#040a0f]',
        3: 'from-[#040a0f] via-[#21121d] to-[#120713]'
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full min-h-screen bg-gradient-to-b transition-colors duration-1000 ease-in-out select-none ${bgClasses[activeAct]}`}
            style={{ contentVisibility: 'auto' }}
        >

            {/* Background Parallax Stars/Dust */}
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0">
                <div className="sticky top-0 h-screen w-full">
                    {activeAct === 1 && <FallingLeaves />}
                    {activeAct === 2 && (
                        <>
                            <FallingLeaves />
                            <Fireflies />
                            <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_10%_20%,#a7f3d0_100%,transparent_0),radial-gradient(2px_2px_at_40%_60%,#34d399_100%,transparent_0),radial-gradient(1.5px_1.5px_at_80%_40%,#6ee7b7_100%,transparent_0)] animate-[pulse_4s_infinite]" />
                        </>
                    )}
                    {activeAct === 3 && (
                        <>
                            <Fireflies />
                            <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,#fbcfe8_100%,transparent_0),radial-gradient(1.5px_1.5px_at_60%_80%,#fda4af_100%,transparent_0),radial-gradient(2px_2px_at_90%_50%,#fecdd3_100%,transparent_0)] animate-pulse" />
                        </>
                    )}
                </div>
            </div>

            {/* Floating Sound controls and Act Indicator */}
            <div className="fixed top-6 right-6 flex items-center gap-4 z-50 pointer-events-auto">
                <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/60 border border-stone-850 text-[10px] text-stone-400 font-sans tracking-widest uppercase">
                    <Heart size={10} className="text-red-500 fill-red-500" />
                    <span>Acto {activeAct}</span>
                </div>
                <button
                    onClick={toggleSound}
                    className="p-3.5 rounded-full border border-stone-850 bg-stone-900/80 hover:bg-stone-850 text-stone-300 transition-colors pointer-events-auto shadow-lg"
                >
                    {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
            </div>

            {/* Sticky characters wrapper */}
            <PikminCharacters
                progress={smoothProgress}
                userType={userType}
                userAccessory={userAccessory}
            />

            {/* The Winding Scroll Path in Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 1000"
                    preserveAspectRatio="none"
                    className="overflow-visible opacity-55"
                >
                    {/* Pathway Underlay borders */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#1b3f27"
                        strokeWidth="10.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#c9a87c"
                        strokeWidth="9.0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-75"
                    />
                    {/* Inner sand texture path */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#dcc3a5"
                        strokeWidth="7.0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="0.3 4"
                        className="opacity-40"
                    />
                </svg>
            </div>

            {/* SCENARIO CONTENT SCROLL GRID */}
            <div className="relative w-full z-20 flex flex-col pointer-events-none">

                {/* Iterate over scenes */}
                {scenes.map((scene) => {
                    // Find memories belonging to this scene
                    const sceneMemories = memories.filter((m) => m.sceneId === scene.id);

                    return (
                        <section
                            key={scene.id}
                            className={`w-full relative flex flex-col justify-center px-4 overflow-hidden ${scene.height}`}
                        >
                            {/* Act Header Labels */}
                            {scene.id === 1 && (
                                <div className="text-center my-6 max-w-sm mx-auto">
                                    <h3 className="font-handwriting text-2xl text-stone-200">
                                        Acto I: Los primeros pasos
                                    </h3>
                                    <p className="font-sans text-[11px] text-stone-500 uppercase tracking-widest mt-1">
                                        Donde comenzó a crecer la complicidad
                                    </p>
                                </div>
                            )}

                            {scene.id === 6 && (
                                <div className="text-center my-12 max-w-sm mx-auto p-4 rounded-xl border border-stone-850 bg-stone-950/60 backdrop-blur-xs">
                                    <h3 className="font-handwriting text-2xl text-[#7FB069]">
                                        Acto II: El encuentro
                                    </h3>
                                    <p className="font-sans text-[11px] text-stone-400 mt-2 leading-relaxed">
                                        De pronto, el camino dejó de sentirse solo. Un Pikmin de roca se une a tu paso.
                                    </p>
                                </div>
                            )}

                            {scene.id === 9 && (
                                <div className="text-center my-12 max-w-sm mx-auto">
                                    <h3 className="font-handwriting text-2xl text-rose-300">
                                        Acto III: El claro final
                                    </h3>
                                    <p className="font-sans text-[11px] text-[#A9CBA4] uppercase tracking-widest mt-1">
                                        Caminando juntos bajo el mismo cielo
                                    </p>
                                </div>
                            )}

                            {/* Render Section Memories */}
                            {sceneMemories.length > 0 && (
                                <div className="w-full max-w-4xl mx-auto flex flex-col md:gap-12 relative py-8 pointer-events-auto">
                                    {/* Staggered positioning mapping */}
                                    {sceneMemories.map((memory) => (
                                        <MemoryCard
                                            key={memory.id}
                                            memory={memory}
                                            onReveal={handleRevealMemory}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Special scene hints */}
                            {scene.id === 1 && (
                                <div className="text-center flex flex-col items-center mt-32 text-stone-500 text-xs font-sans tracking-wide">
                                    <span>Desliza para avanzar...</span>
                                    <motion.div
                                        className="w-1.5 h-6 rounded-full bg-stone-700 mt-3 relative overflow-hidden"
                                        animate={{ y: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 rounded-full bg-emerald-500" />
                                    </motion.div>
                                </div>
                            )}
                        </section>
                    );
                })}

                {/* Finale & Proposal (Scene 11) */}
                <section className="w-full scroll-snap-align bg-[#120713]/80 border-t border-rose-950/20">
                    <Finale userType={userType} userAccessory={userAccessory} />
                </section>
            </div>

            {/* Discrete bottom tracker HUD */}
            <div className="fixed bottom-4 left-4 z-40 bg-stone-900/70 border border-stone-850 p-2 rounded-lg text-[9px] font-mono text-stone-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Expedición: {completedMemories.length} / {memories.length} recuerdos desenterrados</span>
            </div>
        </div>
    );
}
