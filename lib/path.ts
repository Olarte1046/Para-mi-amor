// Path math for responsive scroll path centering

// We outline the frequency and amplitude of the winding path
const FREQUENCY = 4.5; // Number of bends along the path
const AMPLITUDE = 22;  // Left-right variance offset from center (30% to 70% bounds)
const CENTER_X = 50;   // Paths centers around 50vw

/**
 * Returns the horizontal X coordinate (0 - 100%) for a given scroll progress (0 - 1).
 */
export function getPathX(progress: number): number {
    // Clamp progress between 0 and 1
    const t = Math.max(0, Math.min(1, progress));

    // Ease-in and ease-out amplitude near start and end of the path
    let currentAmplitude = AMPLITUDE;
    if (t < 0.1) {
        // Ramp up from 0 to AMPLITUDE
        currentAmplitude = AMPLITUDE * (t / 0.1);
    } else if (t > 0.9) {
        // Ramp down to 0 at the clear/finale
        currentAmplitude = AMPLITUDE * ((1 - t) / 0.1);
    }

    return CENTER_X + Math.sin(t * Math.PI * FREQUENCY) * currentAmplitude;
}

/**
 * Returns the slope/derivative of the path at a given progress (0 - 1).
 * Positive = moving right, Negative = moving left.
 */
export function getPathDerivative(progress: number): number {
    const t = Math.max(0, Math.min(1, progress));
    const delta = 0.005;
    const x1 = getPathX(Math.max(0, t - delta));
    const x2 = getPathX(Math.min(1, t + delta));
    return x2 - x1;
}

/**
 * Generates the SVG path 'd' string for a viewBox of 0 0 100 1000.
 */
export function generateSvgPath(steps = 200): string {
    let pathStr = '';
    for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        const x = getPathX(progress);
        const y = progress * 1000; // viewBox height is 1000

        if (i === 0) {
            pathStr += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        } else {
            pathStr += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
        }
    }
    return pathStr;
}
