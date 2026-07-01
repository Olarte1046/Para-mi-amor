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
    width = 80,
    height = 120,
}: PikminSvgProps) {
    const uid = `pikmin-${type}-${accessory}`;

    // Pikmin game-faithful color palettes
    const palette = {
        red: { body: '#e8201e', light: '#ef6463', dark: '#8a1010', belly: '#f5aaaa', nose: '#c0170f' },
        yellow: { body: '#f5c200', light: '#ffe066', dark: '#9a7a00', belly: '#fde8a0', nose: '#c79500' },
        blue: { body: '#2060e8', light: '#75a8f5', dark: '#103898', belly: '#a0c4f5', nose: '#1040b0' },
        rock: { body: '#4d4d5e', light: '#8888a0', dark: '#2a2a36', belly: '#7a7a8c', nose: '#3a3a48' },
    };
    const c = palette[type] ?? palette.red;

    // Stem/stalk color
    const stemColor = '#3d7a1a';

    // Walking vs idle animation ids
    const animId = isWalking ? 'walk' : 'idle';

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 80 120"
            overflow="visible"
            className={className}
            style={{ transform: `scaleX(${facingRight ? 1 : -1})`, display: 'block' }}
        >
            <defs>
                <style>{`
                    @keyframes pikmin-idle-${uid} {
                        0%,100% { transform: translateY(0px) rotate(0deg); }
                        50%     { transform: translateY(-2px) rotate(1deg); }
                    }
                    @keyframes pikmin-walk-${uid} {
                        0%,100% { transform: translateY(0px) rotate(-4deg); }
                        50%     { transform: translateY(-3px) rotate(4deg); }
                    }
                    @keyframes stem-idle-${uid} {
                        0%,100% { transform: rotate(-4deg); }
                        50%     { transform: rotate(4deg); }
                    }
                    @keyframes stem-walk-${uid} {
                        0%,100% { transform: rotate(-10deg); }
                        50%     { transform: rotate(10deg); }
                    }
                    @keyframes foot-l-${uid} {
                        0%,100% { transform: rotate(-15deg); }
                        50%     { transform: rotate(10deg); }
                    }
                    @keyframes foot-r-${uid} {
                        0%,100% { transform: rotate(10deg); }
                        50%     { transform: rotate(-15deg); }
                    }
                    .body-${uid} {
                        transform-origin: 40px 90px;
                        animation: ${isWalking ? `pikmin-walk-${uid}` : `pikmin-idle-${uid}`}
                                   ${isWalking ? '0.4s' : '2.2s'} ease-in-out infinite;
                    }
                    .stem-${uid} {
                        transform-origin: 40px 46px;
                        animation: ${isWalking ? `stem-walk-${uid}` : `stem-idle-${uid}`}
                                   ${isWalking ? '0.4s' : '2.2s'} ease-in-out infinite;
                    }
                    .foot-l-${uid} {
                        transform-origin: 29px 103px;
                        animation: ${isWalking ? `foot-l-${uid}` : 'none'} 0.4s ease-in-out infinite;
                    }
                    .foot-r-${uid} {
                        transform-origin: 51px 103px;
                        animation: ${isWalking ? `foot-r-${uid}` : 'none'} 0.4s ease-in-out infinite;
                    }
                `}</style>

                {/* Body gradient */}
                <radialGradient id={`bg-${uid}`} cx="38%" cy="35%" r="62%">
                    <stop offset="0%" stopColor={c.light} />
                    <stop offset="55%" stopColor={c.body} />
                    <stop offset="100%" stopColor={c.dark} />
                </radialGradient>
                {/* Belly gradient */}
                <radialGradient id={`belly-${uid}`} cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor={c.belly} stopOpacity="0.95" />
                    <stop offset="100%" stopColor={c.belly} stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* ── Ground shadow ── */}
            <ellipse cx="40" cy="112" rx="18" ry="4" fill="rgba(0,0,0,0.18)" />

            {/* ── Feet (behind body) ── */}
            <ellipse className={`foot-l-${uid}`} cx="29" cy="105" rx="9" ry="5.5" fill={c.dark} />
            <ellipse className={`foot-r-${uid}`} cx="51" cy="105" rx="9" ry="5.5" fill={c.dark} />
            {/* Foot highlights */}
            <ellipse className={`foot-l-${uid}`} cx="27" cy="103" rx="4" ry="2.5" fill={c.body} opacity="0.55" />
            <ellipse className={`foot-r-${uid}`} cx="49" cy="103" rx="4" ry="2.5" fill={c.body} opacity="0.55" />

            {/* ══ ANIMATED BODY GROUP ══ */}
            <g className={`body-${uid}`}>

                {/* ── Stem (with own rotation) ── */}
                <g className={`stem-${uid}`}>
                    {/* Stalk – curves from crown */}
                    <path
                        d="M 40 46 C 40 36 43 26 41 14"
                        stroke={stemColor}
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* LEAF */}
                    {accessory === 'leaf' && (
                        <g transform="translate(41,14)">
                            <path
                                d="M 0 0 C 12 -10 22 -6 14 4 C 8 10 2 5 0 0 Z"
                                fill="#22c55e"
                                stroke="#166534"
                                strokeWidth="0.8"
                            />
                            <path d="M 0 0 C 6 -2 12 -4 14 4" fill="none" stroke="#166534" strokeWidth="0.7" />
                        </g>
                    )}

                    {/* BUD */}
                    {accessory === 'bud' && (
                        <g transform="translate(41,14)">
                            {/* Sepals */}
                            <path d="M -4 4 C -2 -2 2 -2 4 4" fill="#4ade80" />
                            {/* Bud body */}
                            <ellipse cx="0" cy="-3" rx="5.5" ry="8" fill="#db2777" stroke="#9d174d" strokeWidth="0.8" />
                            <ellipse cx="-1" cy="-5" rx="2" ry="3" fill="#f472b6" opacity="0.6" />
                        </g>
                    )}

                    {/* FLOWER */}
                    {accessory === 'flower' && (
                        <g transform="translate(41,14)">
                            {/* 5 petals */}
                            {[0, 72, 144, 216, 288].map((angle) => (
                                <ellipse
                                    key={angle}
                                    cx={Math.sin((angle * Math.PI) / 180) * 9}
                                    cy={-3 + Math.cos((angle * Math.PI) / 180) * -9}
                                    rx="4.5"
                                    ry="6.5"
                                    fill="white"
                                    stroke="#e2e8f0"
                                    strokeWidth="0.5"
                                />
                            ))}
                            {/* Centre */}
                            <circle cx="0" cy="-3" r="5" fill="#facc15" stroke="#a16207" strokeWidth="0.7" />
                            <circle cx="-1.2" cy="-4.5" r="1.5" fill="#fde68a" />
                        </g>
                    )}
                </g>

                {/* ── Yellow Pikmin EARS (behind body) ── */}
                {type === 'yellow' && (
                    <>
                        <path d="M 18 56 C 6 48 4 70 16 68 C 20 67 22 62 22 58 Z"
                            fill={`url(#bg-${uid})`} stroke={c.dark} strokeWidth="1" />
                        <path d="M 62 56 C 74 48 76 70 64 68 C 60 67 58 62 58 58 Z"
                            fill={`url(#bg-${uid})`} stroke={c.dark} strokeWidth="1" />
                    </>
                )}

                {/* ── Rock Pikmin body (angular, stone) ── */}
                {type === 'rock' ? (
                    <g>
                        <path
                            d="M 22 58 L 30 44 L 50 40 L 62 48 L 66 68 L 58 90 L 22 90 L 16 72 Z"
                            fill={`url(#bg-${uid})`}
                            stroke={c.dark}
                            strokeWidth="1.5"
                        />
                        {/* Rock scratches */}
                        <path d="M 30 60 L 36 56" stroke={c.dark} strokeWidth="0.8" opacity="0.5" />
                        <path d="M 44 75 L 50 70" stroke={c.dark} strokeWidth="0.8" opacity="0.5" />
                        {/* Belly tint */}
                        <ellipse cx="40" cy="72" rx="12" ry="10" fill={`url(#belly-${uid})`} />
                    </g>
                ) : (
                    /* ── Standard Pikmin body: faithful tall pear shape ── */
                    <g>
                        {/* Main body shape */}
                        <path
                            d="M 40 44
                               C 25 44 20 58 20 70
                               C 20 86 28 96 40 96
                               C 52 96 60 86 60 70
                               C 60 58 55 44 40 44 Z"
                            fill={`url(#bg-${uid})`}
                        />
                        {/* Belly oval */}
                        <ellipse cx="40" cy="76" rx="11" ry="13" fill={`url(#belly-${uid})`} />
                    </g>
                )}

                {/* ── Hands (small round nubs on sides) ── */}
                <circle cx={type === 'rock' ? 17 : 19} cy="74" r="5" fill={c.body} stroke={c.dark} strokeWidth="0.8" />
                <circle cx={type === 'rock' ? 63 : 61} cy="74" r="5" fill={c.body} stroke={c.dark} strokeWidth="0.8" />

                {/* ── Red nose (long pointy, facing right) ── */}
                {type === 'red' && (
                    <path
                        d="M 56 60 C 66 58 72 61 68 65 C 64 68 56 66 55 63 Z"
                        fill={c.nose}
                        stroke={c.dark}
                        strokeWidth="0.5"
                    />
                )}

                {/* ── Blue Pikmin lips / muzzle ── */}
                {type === 'blue' && (
                    <path
                        d="M 33 68 C 35 73 45 73 47 68"
                        fill="white"
                        stroke={c.dark}
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                )}

                {/* ── EYES (positioned in top-center of body) ── */}
                {/* Left eye white */}
                <ellipse cx="32" cy="58" rx="7.5" ry="9" fill="white" />
                {/* Right eye white */}
                <ellipse cx="48" cy="58" rx="7.5" ry="9" fill="white" />
                {/* Left pupil */}
                <circle cx="33.5" cy="59" r="4.5" fill="#111" />
                {/* Right pupil */}
                <circle cx="49.5" cy="59" r="4.5" fill="#111" />
                {/* Left highlight */}
                <circle cx="31" cy="55" r="2" fill="white" />
                {/* Right highlight */}
                <circle cx="47" cy="55" r="2" fill="white" />
                {/* Small secondary highlights */}
                <circle cx="35" cy="61" r="1" fill="white" opacity="0.7" />
                <circle cx="51" cy="61" r="1" fill="white" opacity="0.7" />
            </g>
        </svg>
    );
}
