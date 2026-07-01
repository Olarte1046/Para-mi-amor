'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Fireflies particle
interface Firefly {
    id: number;
    x: number; // percentage
    y: number; // percentage
    size: number; // pixels
    duration: number;
    delay: number;
}

// Falling leaf
interface Leaf {
    id: number;
    x: number; // start percentage
    size: number; // scale factor
    duration: number;
    delay: number;
    type: number; // leaf SVG type
}

export function Fireflies() {
    const [flies, setFlies] = useState<Firefly[]>([]);

    useEffect(() => {
        // Generate fireflies with randomized coordinates, sizes and animation offsets
        const initialFlies = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 2,
            duration: Math.random() * 6 + 6,
            delay: Math.random() * 5
        }));
        setFlies(initialFlies);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 select-none">
            <div className="sticky top-0 w-full h-screen">
                {flies.map((fly) => (
                    <motion.div
                        key={fly.id}
                        className="absolute rounded-full bg-lime-300 filter blur-[1px]"
                        style={{
                            left: `${fly.x}%`,
                            top: `${fly.y}%`,
                            width: fly.size,
                            height: fly.size,
                            boxShadow: '0 0 10px #86efac, 0 0 20px #4ade80'
                        }}
                        animate={{
                            opacity: [0, 0.8, 0.8, 0],
                            y: [0, -60, -120, -180],
                            x: [0, Math.sin(fly.id) * 15, Math.sin(fly.id) * -15, 0]
                        }}
                        transition={{
                            duration: fly.duration,
                            repeat: Infinity,
                            delay: fly.delay,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export function FallingLeaves() {
    const [leaves, setLeaves] = useState<Leaf[]>([]);

    useEffect(() => {
        // Generate leaves with float parameters
        const initialLeaves = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: Math.random() * 0.6 + 0.4,
            duration: Math.random() * 8 + 8,
            delay: Math.random() * 6,
            type: i % 3
        }));
        setLeaves(initialLeaves);
    }, []);

    // Three types of SVG leaves
    const renderLeafSvg = (type: number) => {
        switch (type) {
            case 0: // Standard green/amber leaf
                return (
                    <svg viewBox="0 0 30 30" className="w-full h-full fill-emerald-800/80 stroke-emerald-950/40 stroke-[0.5]">
                        <path d="M 5 25 C 10 15 15 10 25 5 C 20 15 15 20 5 25 Z" />
                    </svg>
                );
            case 1: // Maple shape leaf (red/rose)
                return (
                    <svg viewBox="0 0 30 30" className="w-full h-full fill-rose-800/70 stroke-rose-950/40 stroke-[0.5]">
                        <path d="M 15 25 L 12 18 L 6 20 L 10 14 L 5 10 L 12 10 L 15 3 L 18 10 L 25 10 L 20 14 L 24 20 L 18 18 Z" />
                    </svg>
                );
            default: // Round golden yellow leaf
                return (
                    <svg viewBox="0 0 30 30" className="w-full h-full fill-amber-600/70 stroke-amber-900/40 stroke-[0.5]">
                        <circle cx="15" cy="15" r="10" />
                        <path d="M 15 25 L 15 29" strokeWidth="1" stroke="#78350f" />
                    </svg>
                );
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 select-none">
            <div className="sticky top-0 w-full h-screen">
                {leaves.map((leaf) => (
                    <motion.div
                        key={leaf.id}
                        className="absolute"
                        style={{
                            left: `${leaf.x}%`,
                            top: -50,
                            width: `${30 * leaf.size}px`,
                            height: `${30 * leaf.size}px`
                        }}
                        animate={{
                            y: ['0vh', '110vh'],
                            x: [`0px`, `${Math.sin(leaf.id) * 60 + 30}px`],
                            rotate: [0, 360 * (leaf.id % 2 === 0 ? 1 : -1)]
                        }}
                        transition={{
                            duration: leaf.duration,
                            repeat: Infinity,
                            delay: leaf.delay,
                            ease: 'linear'
                        }}
                    >
                        {renderLeafSvg(leaf.type)}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
