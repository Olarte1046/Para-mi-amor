'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import FoliageOverlay from './FoliageOverlay';

export interface Memory {
    id: number;
    fileName: string;
    caption: string;
    date: string;
    sceneId: number;
    clusterId?: string;
    side: 'left' | 'right' | 'center';
    foliageType: 'fern' | 'flower' | 'leaves' | 'moss';
}

export interface MemoryCardProps {
    memory: Memory;
    onReveal?: (id: number) => void;
}

export default function MemoryCard({ memory, onReveal }: MemoryCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    // Detect when the card enters the central viewport scan line (around 50vh - 65vh)
    // this is where the Pikmin is situated.
    const isInSensorZone = useInView(cardRef, {
        margin: '-45% 0px -35% 0px', // Matches the ~60vh mark
        once: false
    });

    useEffect(() => {
        if (isInSensorZone && !hasBeenRevealed) {
            setHasBeenRevealed(true);
            if (onReveal) {
                onReveal(memory.id);
            }
        }
    }, [isInSensorZone, hasBeenRevealed, memory.id, onReveal]);

    // 3D Tilt Effect on hover
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !hasBeenRevealed) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Smooth angle tilt values
        const rX = -(mouseY / height) * 15; // Max 15 degrees
        const rY = (mouseX / width) * 15;

        setTilt({ x: rX, y: rY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    // Card side layouts
    const sideAlignProps = {
        left: 'mr-auto md:ml-12 md:mr-0',
        right: 'ml-auto md:mr-12 md:ml-0',
        center: 'mx-auto'
    };

    return (
        <div
            ref={cardRef}
            className={`w-full max-w-[280px] xs:max-w-[325px] flex flex-col items-center py-6 px-4 z-20 ${sideAlignProps[memory.side] || sideAlignProps.left
                }`}
        >
            {/* 3D Tilt Frame Wrapper */}
            <motion.div
                className="w-full relative rounded-2xl bg-stone-950/80 border border-stone-800 shadow-2xl p-3 select-none overflow-hidden duration-300"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    boxShadow: hasBeenRevealed
                        ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 15px 1px rgba(78, 124, 89, 0.15)'
                        : '0 10px 20px -10px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-900 border border-stone-850">

                    {/* Foliage cover overlay */}
                    <FoliageOverlay type={memory.foliageType} isOpen={hasBeenRevealed} />

                    {/* Actual Memory Photo */}
                    <motion.img
                        src={`/images/${memory.fileName}`}
                        alt={memory.caption}
                        className="w-full h-full object-cover select-none"
                        initial={{ scale: 1.1, filter: 'blur(5px)' }}
                        animate={
                            hasBeenRevealed
                                ? { scale: 1, filter: 'blur(0px)' }
                                : { scale: 1.1, filter: 'blur(5px)' }
                        }
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />

                    {/* Sparkle particle overlay when revealed */}
                    {hasBeenRevealed && (
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent mix-blend-screen pointer-events-none animate-pulse" />
                    )}
                </div>

                {/* Caption and content info section */}
                <div className="relative mt-4 px-1 min-h-[90px] flex flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={hasBeenRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {/* Hand-written text caption */}
                        <p className="font-handwriting text-stone-100 text-lg leading-relaxed leading-[1.3] text-left">
                            {memory.caption}
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-3 flex items-center justify-between text-[11px] font-sans tracking-widest text-[#7FB069] uppercase"
                        initial={{ opacity: 0 }}
                        animate={hasBeenRevealed ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                    >
                        <span>{memory.date}</span>
                        <span className="text-[10px] text-stone-600 font-mono">
                            N° {String(memory.id).padStart(2, '0')}
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
