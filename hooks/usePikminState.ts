import { useState, useEffect } from 'react';
import { MotionValue } from 'framer-motion';
import { getPathX, getPathDerivative } from '../lib/path';

export interface PikminState {
    x: number;
    isWalking: boolean;
    facingRight: boolean;
}

export function usePikminState(smoothProgress: MotionValue<number>): PikminState {
    const [x, setX] = useState(() => getPathX(smoothProgress.get()));
    const [isWalking, setIsWalking] = useState(false);
    const [facingRight, setFacingRight] = useState(true);

    useEffect(() => {
        let lastValue = smoothProgress.get();
        let idleTimeout: NodeJS.Timeout;

        const unsubscribe = smoothProgress.on('change', (latest) => {
            // Calculate new X coordinate based on path equation
            const currentX = getPathX(latest);
            setX(currentX);

            // Determine movement activity
            const diff = latest - lastValue;
            lastValue = latest;

            if (Math.abs(diff) > 0.0002) {
                setIsWalking(true);

                // Calculate horizontal direction based on derivative slope
                const slope = getPathDerivative(latest);
                if (Math.abs(slope) > 0.005) {
                    setFacingRight(slope > 0);
                }

                // Reset walking state after scroll slows down
                clearTimeout(idleTimeout);
                idleTimeout = setTimeout(() => {
                    setIsWalking(false);
                }, 200);
            }
        });

        return () => {
            unsubscribe();
            clearTimeout(idleTimeout);
        };
    }, [smoothProgress]);

    return { x, isWalking, facingRight };
}
