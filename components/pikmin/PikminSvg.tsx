import React from 'react';

export interface PikminSvgProps {
    type: 'red' | 'yellow' | 'blue' | 'rock';
    accessory: 'leaf' | 'bud' | 'flower';
    isWalking: boolean;
    facingRight: boolean;
    className?: string;
    width?: number;
    height?: number;
}

export default function PikminSvg({
    type,
    accessory,
    isWalking,
    facingRight,
    className = '',
    width = 72,
    height = 128,
}: PikminSvgProps) {
    const uid = `pk-${type}-${Math.random().toString(36).slice(2, 6)}`;

    // Game-faithful flat colors
    const C = {
        red: { body: '#d92020', shade: '#a01515', light: '#f05050', stem: '#2a6200', leaf: '#4aaa10', leafShade: '#2d7200', eye: '#fff', pupil: '#111', nose: '#c01010' },
        yellow: { body: '#f0c000', shade: '#b08800', light: '#ffd840', stem: '#2a6200', leaf: '#4aaa10', leafShade: '#2d7200', eye: '#fff', pupil: '#111', nose: '#c08800' },
        blue: { body: '#1850d0', shade: '#0e3490', light: '#4880e8', stem: '#2a6200', leaf: '#4aaa10', leafShade: '#2d7200', eye: '#fff', pupil: '#111', nose: '#0e3490' },
        rock: { body: '#545464', shade: '#2e2e3c', light: '#8888a0', stem: '#2a6200', leaf: '#4aaa10', leafShade: '#2d7200', eye: '#fff', pupil: '#111', nose: '#3a3a4a' },
    }[type];

    const outline = '#111114';
    const ow = 1.8; // outline stroke width

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 72 128"
            overflow="visible"
            className={className}
            style={{
                transform: `scaleX(${facingRight ? 1 : -1})`,
                display: 'block',
                imageRendering: 'pixelated',
            }}
        >
            <defs>
                <style>{`
                    @keyframes ${uid}-idle {
                        0%,100% { transform: translateY(0); }
                        45%     { transform: translateY(-3px); }
                    }
                    @keyframes ${uid}-walk {
                        0%,100% { transform: rotate(-5deg) translateY(0); }
                        50%     { transform: rotate(5deg) translateY(-3px); }
                    }
                    @keyframes ${uid}-stem {
                        0%,100% { transform: rotate(-5deg); }
                        50%     { transform: rotate(5deg); }
                    }
                    @keyframes ${uid}-stem-fast {
                        0%,100% { transform: rotate(-12deg); }
                        50%     { transform: rotate(12deg); }
                    }
                    @keyframes ${uid}-fl {
                        0%,100% { transform: rotate(-18deg); }
                        50%     { transform: rotate(8deg); }
                    }
                    @keyframes ${uid}-fr {
                        0%,100% { transform: rotate(8deg); }
                        50%     { transform: rotate(-18deg); }
                    }
                    .${uid}-body {
                        animation: ${isWalking ? `${uid}-walk 0.38s` : `${uid}-idle 2s`} ease-in-out infinite;
                        transform-origin: 36px 105px;
                    }
                    .${uid}-stem {
                        animation: ${isWalking ? `${uid}-stem-fast 0.38s` : `${uid}-stem 2s`} ease-in-out infinite;
                        transform-origin: 36px 40px;
                    }
                    .${uid}-fl {
                        animation: ${isWalking ? `${uid}-fl 0.38s ease-in-out infinite` : 'none'};
                        transform-origin: 28px 106px;
                    }
                    .${uid}-fr {
                        animation: ${isWalking ? `${uid}-fr 0.38s ease-in-out infinite` : 'none'};
                        transform-origin: 44px 106px;
                    }
                `}</style>
            </defs>

            {/* ══ STEM + ACCESSORY (behind body) ══ */}
            <g className={`${uid}-stem`}>
                {/* Long curved stalk — goes up and arcs right like reference */}
                <path
                    d="M 36 38 C 36 28 40 16 44 4"
                    stroke={C.stem}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M 36 38 C 36 28 40 16 44 4"
                    stroke="#1a4000"
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                />

                {/* LEAF — big single leaf like in reference */}
                {accessory === 'leaf' && (
                    <g>
                        <path
                            d="M 44 4 C 55 -10 80 -12 74 6 C 68 18 52 16 44 4 Z"
                            fill={C.leaf}
                            stroke={outline}
                            strokeWidth={ow}
                            strokeLinejoin="round"
                        />
                        {/* Leaf midrib */}
                        <path d="M 44 4 C 58 0 70 2 74 6" stroke={C.leafShade} strokeWidth="1.2" fill="none" />
                        {/* Leaf veins */}
                        <path d="M 52 2 C 54 -4 58 -6 60 -4" stroke={C.leafShade} strokeWidth="0.7" fill="none" opacity="0.7" />
                        <path d="M 60 0 C 64 -5 68 -5 70 -2" stroke={C.leafShade} strokeWidth="0.7" fill="none" opacity="0.7" />
                    </g>
                )}

                {/* BUD */}
                {accessory === 'bud' && (
                    <g transform="translate(44, 4)">
                        {/* Sepals */}
                        <path d="M -4 4 C -1 -1 1 -1 4 4" fill={C.leaf} stroke={outline} strokeWidth={ow} />
                        {/* Bud */}
                        <path
                            d="M -6 2 C -6 -10 6 -10 6 2 C 6 8 -6 8 -6 2 Z"
                            fill="#e8207a"
                            stroke={outline}
                            strokeWidth={ow}
                        />
                        <path d="M -2 -6 C 0 -10 2 -8 1 -4" stroke="#f580bb" strokeWidth="1" fill="none" opacity="0.7" />
                    </g>
                )}

                {/* FLOWER */}
                {accessory === 'flower' && (
                    <g transform="translate(44, 4)">
                        {/* Petals — 5 around center */}
                        {[0, 72, 144, 216, 288].map((a, i) => {
                            const rad = (a * Math.PI) / 180;
                            return (
                                <ellipse
                                    key={i}
                                    cx={Math.sin(rad) * 8}
                                    cy={-4 - Math.cos(rad) * 8}
                                    rx="4.5" ry="6.5"
                                    fill="white"
                                    stroke={outline}
                                    strokeWidth={ow}
                                />
                            );
                        })}
                        <circle cx="0" cy="-4" r="5.5" fill="#f5c200" stroke="#8a6800" strokeWidth="1" />
                    </g>
                )}
            </g>

            {/* ══ GROUND SHADOW ══ */}
            <ellipse cx="36" cy="122" rx="16" ry="4" fill="rgba(0,0,0,0.22)" />

            {/* ══ FEET (behind body, drawn first) ══ */}
            {/* Left foot */}
            <g className={`${uid}-fl`}>
                <path
                    d="M 20 108 C 18 108 15 110 15 113 C 15 116 18 117 22 117 C 26 117 28 116 28 113 C 28 110 25 108 24 108 Z"
                    fill={C.body}
                    stroke={outline}
                    strokeWidth={ow}
                />
                <path d="M 19 112 C 19 110 22 109 24 110" stroke={C.shade} strokeWidth="0.7" fill="none" opacity="0.5" />
            </g>
            {/* Right foot */}
            <g className={`${uid}-fr`}>
                <path
                    d="M 48 108 C 46 108 44 110 44 113 C 44 116 46 117 50 117 C 54 117 56 116 56 113 C 56 110 54 108 52 108 Z"
                    fill={C.body}
                    stroke={outline}
                    strokeWidth={ow}
                />
                <path d="M 49 112 C 49 110 52 109 54 110" stroke={C.shade} strokeWidth="0.7" fill="none" opacity="0.5" />
            </g>

            {/* ══ MAIN ANIMATED BODY GROUP ══ */}
            <g className={`${uid}-body`}>

                {/* Yellow Pikmin large ears (behind body) — wide flap with hooked tip */}
                {type === 'yellow' && (<>
                    <path d="M 21 52 C 8 44 1 58 6 68 C 9 74 16 72 20 66 C 22 62 21 56 21 52 Z"
                        fill={C.body} stroke={outline} strokeWidth={ow} strokeLinejoin="round" />
                    <path d="M 51 52 C 64 44 71 58 66 68 C 63 74 56 72 52 66 C 50 62 51 56 51 52 Z"
                        fill={C.body} stroke={outline} strokeWidth={ow} strokeLinejoin="round" />
                </>)}

                {/* ── BODY SHAPE ──
                    Reference: narrow top (head), wide middle (belly ~60% down), tapers to leg attachment
                    Flows as one continuous shape like reference foto
                */}
                {type === 'rock' ? (
                    /* Rock Pikmin: chunky polygon / stone */
                    <path
                        d="M 28 38 L 36 32 L 44 38 L 52 48 L 56 62 L 54 78 L 50 92 L 36 96 L 22 92 L 18 78 L 16 62 L 20 48 Z"
                        fill={C.body}
                        stroke={outline}
                        strokeWidth={ow}
                        strokeLinejoin="round"
                    />
                ) : (
                    /* Standard Pikmin: head wide at y≈51, sharp neck pinch at y≈73, wide column to y≈102 */
                    <path
                        d={`
                            M 36 36
                            C 42 36 52 42 52 51
                            C 52 58 46 62 42 67
                            C 41 70 41 72 41 73
                            C 41 74 40 75 36 75
                            C 32 75 31 74 31 73
                            C 31 72 31 70 30 67
                            C 26 62 20 58 20 51
                            C 20 42 30 36 36 36 Z
                        `}
                        fill={C.body}
                        stroke={outline}
                        strokeWidth={ow}
                        strokeLinejoin="round"
                    />
                )}
                {/* Lower column / skirt — from neck pinch down to leg attachment */}
                {type !== 'rock' && (
                    <path
                        d={`
                            M 31 73
                            C 28 75 27 78 27 85
                            C 27 92 27 98 28 102
                            L 44 102
                            C 45 98 45 92 45 85
                            C 45 78 44 75 41 73
                            C 40 75 36 75 36 75
                            C 36 75 32 75 31 73 Z
                        `}
                        fill={C.body}
                        stroke={outline}
                        strokeWidth={ow}
                        strokeLinejoin="round"
                    />
                )}

                {/* Body lighting (left highlight) */}
                <path
                    d="M 26 42 C 24 46 22 52 23 58 C 24 62 26 60 27 56 C 28 50 28 44 30 40 C 29 39 27 40 26 42 Z"
                    fill={C.light}
                    opacity="0.45"
                />

                {/* Body shade (right side) */}
                <path
                    d="M 46 46 C 50 52 52 58 50 66 C 49 70 47 72 46 70 C 44 64 44 55 44 48 C 44 44 45 44 46 46 Z"
                    fill={C.shade}
                    opacity="0.35"
                />

                {/* ── ARMS — slim nubs, barely protruding from body sides ── */}
                {/* Left arm — outline first, then fill */}
                <path
                    d="M 22 78 C 18 76 15 77 16 80 C 17 82 20 82 22 80"
                    stroke={outline}
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M 22 78 C 18 76 15 77 16 80 C 17 82 20 82 22 80"
                    stroke={C.body}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Right arm */}
                <path
                    d="M 50 78 C 54 76 57 77 56 80 C 55 82 52 82 50 80"
                    stroke={outline}
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M 50 78 C 54 76 57 77 56 80 C 55 82 52 82 50 80"
                    stroke={C.body}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* ── LEGS — wider stubs matching column width, short ── */}
                {/* Left leg */}
                <rect x="22" y="100" width="11" height="9" rx="3" fill={C.body} stroke={outline} strokeWidth={ow} />
                {/* Right leg */}
                <rect x="39" y="100" width="11" height="9" rx="3" fill={C.body} stroke={outline} strokeWidth={ow} />

                {/* ── Red Pikmin NOSE — pointing right like reference ── */}
                {type === 'red' && (
                    <path
                        d="M 48 60 C 56 56 64 59 61 65 C 58 69 50 67 48 64 Z"
                        fill={C.nose}
                        stroke={outline}
                        strokeWidth={ow}
                        strokeLinejoin="round"
                    />
                )}

                {/* ── Blue Pikmin LIPS / MUZZLE ── */}
                {type === 'blue' && (
                    <path
                        d="M 28 73 C 32 79 40 79 44 73"
                        fill="white"
                        stroke={outline}
                        strokeWidth={ow}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}

                {/* Rock scratches */}
                {type === 'rock' && (<>
                    <path d="M 28 58 L 34 54" stroke={C.shade} strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 42 74 L 46 70" stroke={C.shade} strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 30 72 L 33 68" stroke={C.shade} strokeWidth="1.0" strokeLinecap="round" />
                </>)}

                {/* ── EYES — large, on the sides, sticking out from neck ──
                    In reference: eyes are near HEAD (upper body), WHITE large oval, black pupil, highlight dot
                    They appear to float slightly off the body surface
                */}
                {/* Left eye — circular, centered at y≈53 */}
                <ellipse cx="23" cy="53" rx="9" ry="9" fill={outline} />
                <ellipse cx="23" cy="53" rx="8" ry="8" fill={C.eye} />
                <circle cx="24" cy="54" r="4.5" fill={C.pupil} />
                <circle cx="21" cy="50" r="2" fill="white" /> {/* Highlight */}

                {/* Right eye — circular, centered at y≈53 */}
                <ellipse cx="49" cy="53" rx="9" ry="9" fill={outline} />
                <ellipse cx="49" cy="53" rx="8" ry="8" fill={C.eye} />
                <circle cx="50" cy="54" r="4.5" fill={C.pupil} />
                <circle cx="47" cy="50" r="2" fill="white" />

            </g>
        </svg>
    );
}
