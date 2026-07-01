import React, { useEffect, useState } from 'react';
import { MotionValue } from 'framer-motion';
import PikminSvg from './PikminSvg';
import { usePikminState } from '../../hooks/usePikminState';
import { getPathX, getPathDerivative } from '../../lib/path';

export interface PikminCharactersProps {
    progress: MotionValue<number>;
    userType: 'red' | 'yellow' | 'blue';
    userAccessory: 'leaf' | 'bud' | 'flower';
}

export default function PikminCharacters({
    progress,
    userType,
    userAccessory
}: PikminCharactersProps) {
    // Main character state (she)
    const mainState = usePikminState(progress);

    // Companion state (creator, Rock Pikmin)
    // The companion joins the walk at progress > 0.45 (Act II, Scene 6 encounter)
    const [companionActive, setCompanionActive] = useState(false);
    const [companionX, setCompanionX] = useState(50);
    const [companionIsWalking, setCompanionIsWalking] = useState(false);
    const [companionFacingRight, setCompanionFacingRight] = useState(true);

    useEffect(() => {
        let lastCompValue = 0;
        let compTimeout: NodeJS.Timeout;

        const unsubscribe = progress.on('change', (latest) => {
            // Companion appears starting at Act II (Scene 6, progress > ~0.45)
            // Once unlocked, companion stays visible for the rest of the journey
            if (latest > 0.45) {
                setCompanionActive(true);
            } else {
                setCompanionActive(false);
            }

            // Companion lags behind in scroll progress by 0.02 units
            const compProgress = Math.max(0, latest - 0.022);
            const currentCompX = getPathX(compProgress);
            setCompanionX(currentCompX);

            const diff = compProgress - lastCompValue;
            lastCompValue = compProgress;

            if (Math.abs(diff) > 0.0002) {
                setCompanionIsWalking(true);
                const slope = getPathDerivative(compProgress);
                if (Math.abs(slope) > 0.005) {
                    setCompanionFacingRight(slope > 0);
                }

                clearTimeout(compTimeout);
                compTimeout = setTimeout(() => {
                    setCompanionIsWalking(false);
                }, 200);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(compTimeout);
        };
    }, [progress]);

    // Height & offsets:
    // She is positioned at top: 60vh
    // He is positioned at top: 52vh (slightly higher, walking behind her)
    return (
        <div className="fixed inset-x-0 top-0 h-screen pointer-events-none z-40 select-none">
            {/* Container representing the viewport */}
            <div className="relative w-full h-full">
                {/* Main Pikmin (She) */}
                <div
                    className="absolute transition-all duration-75 ease-out"
                    style={{
                        left: `${mainState.x}%`,
                        top: '60vh',
                        transform: 'translate(-50%, -100%)',
                        transition: 'left 0.1s ease-out'
                    }}
                >
                    <PikminSvg
                        type={userType}
                        accessory={userAccessory}
                        isWalking={mainState.isWalking}
                        facingRight={mainState.facingRight}
                        width={85}
                        height={105}
                    />
                    {/* Label indicating 'Tú' */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-[10px] text-emerald-300 font-sans tracking-wide">
                        Tú
                    </div>
                </div>

                {/* Companion Pikmin (He, Rock Pikmin) */}
                {companionActive && (
                    <div
                        className="absolute transition-all duration-75 ease-out"
                        style={{
                            left: `${companionX}%`,
                            top: '50vh', // Positioned slightly behind (higher up on screen)
                            transform: 'translate(-50%, -100%)',
                            transition: 'left 0.1s ease-out'
                        }}
                    >
                        <PikminSvg
                            type="rock"
                            accessory="flower" // The rock Pikmin has a flower representing mature love!
                            isWalking={companionIsWalking}
                            facingRight={companionFacingRight}
                            width={75}
                            height={95}
                        />
                        {/* Label indicating 'Yo' */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950/70 border border-slate-500/20 text-[10px] text-slate-300 font-sans tracking-wide">
                            Yo (Roca)
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
