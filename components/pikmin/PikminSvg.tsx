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

                {/* Yellow Pikmin large ears (behind body) */}
                {type === 'yellow' && (<>
                    <path d="M 20 56 C 6 48 2 66 14 68 C 18 69 20 65 22 61 Z"
                        fill={C.body} stroke={outline} strokeWidth={ow} strokeLinejoin="round" />
                    <path d="M 52 56 C 66 48 70 66 58 68 C 54 69 52 65 50 61 Z"
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
                    /* Standard Pikmin: authentic elongated bulb from reference */
                    <path
                        d={`
                            M 36 36
                            C 40 36 46 38 48 44
                            C 52 50 54 58 54 66
                            C 54 78 50 90 46 96
                            C 43 100 40 102 36 102
                            C 32 102 29 100 26 96
                            C 22 90 18 78 18 66
                            C 18 58 20 50 24 44
                            C 26 38 32 36 36 36 Z
                        `}
                        fill={C.body}
                        stroke={outline}
                        strokeWidth={ow}
                        strokeLinejoin="round"
                    />
                )}

                {/* Body lighting (left highlight) */}
                <path
                    d="M 26 46 C 24 52 22 60 23 68 C 24 72 26 70 27 65 C 28 58 28 50 30 44 C 29 43 27 44 26 46 Z"
                    fill={C.light}
                    opacity="0.45"
                />

                {/* Body shade (right side) */}
                <path
                    d="M 46 50 C 50 58 52 66 50 78 C 49 83 47 86 46 84 C 44 78 44 68 44 60 C 44 56 45 52 46 50 Z"
                    fill={C.shade}
                    opacity="0.35"
                />

                {/* ── ARMS — thin wavy nubs mid body ── */}
                {/* Left arm */}
                <path
                    d="M 20 70 C 14 68 10 70 11 74 C 12 77 16 76 19 74"
                    stroke={C.body}
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M 20 70 C 14 68 10 70 11 74 C 12 77 16 76 19 74"
                    stroke={outline}
                    strokeWidth="7.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{ zIndex: -1 }}
                />
                <path
                    d="M 20 70 C 14 68 10 70 11 74 C 12 77 16 76 19 74"
                    stroke={C.body}
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Right arm */}
                <path
                    d="M 52 70 C 58 68 62 70 61 74 C 60 77 56 76 53 74"
                    stroke={outline}
                    strokeWidth="7.5"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M 52 70 C 58 68 62 70 61 74 C 60 77 56 76 53 74"
                    stroke={C.body}
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* ── LEGS — thin upright stubs ── */}
                {/* Left leg */}
                <rect x="25" y="98" width="8" height="12" rx="3" fill={C.body} stroke={outline} strokeWidth={ow} />
                {/* Right leg */}
                <rect x="39" y="98" width="8" height="12" rx="3" fill={C.body} stroke={outline} strokeWidth={ow} />

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
                {/* Left eye — sticks out left */}
                <ellipse cx="23" cy="58" rx="10" ry="10" fill={outline} /> {/* Outline circle */}
                <ellipse cx="23" cy="58" rx="9" ry="9" fill={C.eye} />
                <circle cx="24" cy="59" r="5.5" fill={C.pupil} />
                <circle cx="21" cy="55" r="2.5" fill="white" /> {/* Highlight */}
                <circle cx="26" cy="61" r="1.2" fill="white" opacity="0.6" />

                {/* Right eye — sticks out right */}
                <ellipse cx="49" cy="58" rx="10" ry="10" fill={outline} />
                <ellipse cx="49" cy="58" rx="9" ry="9" fill={C.eye} />
                <circle cx="50" cy="59" r="5.5" fill={C.pupil} />
                <circle cx="47" cy="55" r="2.5" fill="white" />
                <circle cx="52" cy="61" r="1.2" fill="white" opacity="0.6" />

            </g>
        </svg>
    );
}
