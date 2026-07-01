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

    // Fire when the card is 25% visible — generous so all cards reveal while scrolling
    const isInView = useInView(cardRef, {
        margin: '0px 0px -15% 0px',
        once: true, // revealed once = stays open forever (no flickering)
    });

    useEffect(() => {
        if (isInView && !hasBeenRevealed) {
            // Small delay so the Pikmin "walks to" the card before it opens
            const t = setTimeout(() => {
                setHasBeenRevealed(true);
                if (onReveal) onReveal(memory.id);
            }, 180);
            return () => clearTimeout(t);
        }
    }, [isInView, hasBeenRevealed, memory.id, onReveal]);

    // Tap-to-reveal fallback (mobile / accessibility)
    const handleTap = () => {
        if (!hasBeenRevealed) {
            setHasBeenRevealed(true);
            if (onReveal) onReveal(memory.id);
        }
    };

    // Subtle 3D tilt on hover (desktop only)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !hasBeenRevealed) return;
        const rect = cardRef.current.getBoundingClientRect();
        const rx = -((e.clientY - rect.top - rect.height / 2) / rect.height) * 12;
        const ry = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 12;
        setTilt({ x: rx, y: ry });
    };
    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const sideClass = {
        left: 'mr-auto ml-4 md:ml-16',
        right: 'ml-auto mr-4 md:mr-16',
        center: 'mx-auto',
    }[memory.side] ?? 'mx-auto';

    return (
        <div
            ref={cardRef}
            onClick={handleTap}
            className={`w-[280px] sm:w-[310px] flex flex-col items-center py-8 z-20 pointer-events-auto cursor-pointer ${sideClass}`}
        >
            <motion.div
                className="w-full relative rounded-2xl bg-[#12170f] border border-[#2a3d20] shadow-2xl p-2.5 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    boxShadow: hasBeenRevealed
                        ? '0 24px 48px -12px rgba(0,0,0,0.8), 0 0 24px 2px rgba(59,130,80,0.2)'
                        : '0 8px 24px -8px rgba(0,0,0,0.6)',
                    transition: 'box-shadow 0.4s ease',
                }}
            >
                {/* Photo frame */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#0a100a]">

                    {/* Foliage cover — slides away when revealed */}
                    <FoliageOverlay type={memory.foliageType} isOpen={hasBeenRevealed} />

                    {/* Photo */}
                    <motion.img
                        src={`/images/${memory.fileName}`}
                        alt={memory.caption}
                        className="absolute inset-0 w-full h-full object-cover select-none"
                        loading="lazy"
                        initial={{ scale: 1.08, filter: 'blur(6px) brightness(0.6)' }}
                        animate={hasBeenRevealed
                            ? { scale: 1, filter: 'blur(0px) brightness(1)' }
                            : { scale: 1.08, filter: 'blur(6px) brightness(0.6)' }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    {/* Tap hint when not yet revealed */}
                    {!hasBeenRevealed && (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="text-2xl">🌿</span>
                            <span className="text-[10px] font-sans text-emerald-300/70 tracking-widest uppercase">
                                Toca para revelar
                            </span>
                        </motion.div>
                    )}

                    {/* Soft vignette once revealed */}
                    {hasBeenRevealed && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a100a]/60 via-transparent to-transparent pointer-events-none" />
                    )}
                </div>

                {/* Caption area */}
                <div className="px-2 pt-3 pb-1 min-h-[88px] flex flex-col justify-between">
                    <motion.p
                        className="font-handwriting text-[#e8f0e0] text-[1.15rem] leading-snug"
                        initial={{ opacity: 0, y: 8 }}
                        animate={hasBeenRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ delay: 0.35, duration: 0.55 }}
                    >
                        {memory.caption}
                    </motion.p>

                    <motion.div
                        className="mt-2 flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={hasBeenRevealed ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.65, duration: 0.4 }}
                    >
                        <span className="text-[10px] font-sans tracking-widest text-[#7aaa60] uppercase">
                            {memory.date}
                        </span>
                        <span className="text-[9px] font-mono text-[#3d5c30]">
                            #{String(memory.id).padStart(2, '0')}
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
