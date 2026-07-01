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
    width = 100,
    height = 120
}: PikminSvgProps) {
    // Colors for body
    const bodyColors = {
        red: { primary: '#dc2626', shadow: '#b91c1c', specular: '#f87171' },
        yellow: { primary: '#eab308', shadow: '#ca8a04', specular: '#fde047' },
        blue: { primary: '#2563eb', shadow: '#1d4ed8', specular: '#60a5fa' },
        rock: { primary: '#6b7280', shadow: '#4b5563', specular: '#9ca3af' }
    };

    const colors = bodyColors[type] || bodyColors.red;

    // Animation classes
    const walkClass = isWalking ? 'animate-walk' : 'animate-breathing';
    const leftFootClass = isWalking ? 'animate-foot-left' : '';
    const rightFootClass = isWalking ? 'animate-foot-right' : '';
    const stemClass = isWalking ? 'animate-stem-wobble' : 'animate-stem-sway';

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 120"
            className={`${className} transition-transform duration-300`}
            style={{
                transform: `scaleX(${facingRight ? 1 : -1})`,
                overflow: 'visible'
            }}
        >
            <defs>
                {/* Style definitions for simple but fluid css animations */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes spacing-breath {
            0%, 100% { transform: scale(1) translateY(0px); }
            50% { transform: scale(0.97, 1.03) translateY(-1px); }
          }
          @keyframes walking-wobble {
            0%, 100% { transform: rotate(-4deg) translateY(0px); }
            50% { transform: rotate(4deg) translateY(-2px); }
          }
          @keyframes foot-walk-l {
            0%, 100% { transform: rotate(-10deg) translateY(0px); }
            50% { transform: rotate(15deg) translateY(-1px); }
          }
          @keyframes foot-walk-r {
            0%, 100% { transform: rotate(15deg) translateY(-1px); }
            50% { transform: rotate(-10deg) translateY(0px); }
          }
          @keyframes stem-swaying {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          @keyframes stem-wobbling {
            0%, 100% { transform: rotate(-7deg); }
            50% { transform: rotate(7deg); }
          }
          .animate-breathing {
            animation: spacing-breath 2.5s ease-in-out infinite;
            transform-origin: 50% 90%;
          }
          .animate-walk {
            animation: walking-wobble 0.35s ease-in-out infinite;
            transform-origin: 50% 90%;
          }
          .animate-foot-left {
            animation: foot-walk-l 0.35s ease-in-out infinite;
            transform-origin: 40% 90%;
          }
          .animate-foot-right {
            animation: foot-walk-r 0.35s ease-in-out infinite;
            transform-origin: 60% 90%;
          }
          .animate-stem-sway {
            animation: stem-swaying 2.5s ease-in-out infinite;
            transform-origin: 50% 40%;
          }
          .animate-stem-wobble {
            animation: stem-wobbling 0.35s ease-in-out infinite;
            transform-origin: 50% 40%;
          }
        `}} />

                {/* Shading gradients */}
                <radialGradient id={`bodyGrad-${type}`} cx="45%" cy="40%" r="55%">
                    <stop offset="0%" stopColor={colors.specular} />
                    <stop offset="60%" stopColor={colors.primary} />
                    <stop offset="100%" stopColor={colors.shadow} />
                </radialGradient>

                {/* Shadow filter under feet */}
                <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.15 0" />
                </filter>
            </defs>

            {/* Ground Shadow */}
            <ellipse cx="50" cy="108" rx="22" ry="5" filter="url(#shadowFilter)" />

            {/* Feet & Legs */}
            <g id="feet">
                {/* Left Foot */}
                <path
                    d="M 32 94 A 6 6 0 0 0 44 94 Z"
                    fill={colors.shadow}
                    className={leftFootClass}
                    style={{ transformOrigin: '38px 94px' }}
                />
                {/* Right Foot */}
                <path
                    d="M 56 94 A 6 6 0 0 0 68 94 Z"
                    fill={colors.shadow}
                    className={rightFootClass}
                    style={{ transformOrigin: '62px 94px' }}
                />
            </g>

            {/* Main Animated Body Group */}
            <g className={walkClass}>

                {/* STEM (Leaf / Bud / Flower stalk) */}
                <g id="stem" className={stemClass}>
                    {/* Stalk */}
                    <path
                        d="M 50 42 C 50 25 54 18 52 10"
                        fill="none"
                        stroke="#4d7c0f"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />

                    {/* ACCESSORY ON STALK */}
                    {accessory === 'leaf' && (
                        <path
                            d="M 52 10 C 62 0 74 3 64 12 C 58 17 54 12 52 10 Z"
                            fill="#22c55e"
                            stroke="#15803d"
                            strokeWidth="1"
                        />
                    )}

                    {accessory === 'bud' && (
                        <g transform="translate(52, 9)">
                            <ellipse cx="0" cy="-4" rx="6" ry="8" fill="#ec4899" stroke="#db2777" strokeWidth="1" />
                            <path d="M -6 -4 C -2 -12 2 -12 6 -4" fill="none" stroke="#f472b6" strokeWidth="1" />
                            <path d="M 0 -12 L 0 -4" stroke="#db2777" strokeWidth="1" />
                            {/* Bud base sepals */}
                            <path d="M -5 1 C -2 3 2 3 5 1 L 0 -1 Z" fill="#84cc16" />
                        </g>
                    )}

                    {accessory === 'flower' && (
                        <g transform="translate(52, 3)">
                            {/* Petals */}
                            <ellipse cx="0" cy="-10" rx="5" ry="7" fill="#ffffff" />
                            <ellipse cx="0" cy="4" rx="5" ry="7" fill="#ffffff" />
                            <ellipse cx="-7" cy="-3" rx="7" ry="5" fill="#ffffff" />
                            <ellipse cx="7" cy="-3" rx="7" ry="5" fill="#ffffff" />

                            {/* Flower Center */}
                            <circle cx="0" cy="-3" r="4.5" fill="#eab308" stroke="#ca8a04" strokeWidth="0.5" />
                        </g>
                    )}
                </g>

                {/* CHARACTER SPECIFIC BODY ELEMENTS */}
                <g id="body">
                    {type === 'rock' ? (
                        /* Angular polygonal body for Rock Pikmin */
                        <path
                            d="M 32 46 L 48 38 L 68 44 L 72 65 L 62 86 L 38 88 L 26 68 Z"
                            fill={`url(#bodyGrad-${type})`}
                            stroke="#374151"
                            strokeWidth="1.5"
                        />
                    ) : (
                        /* Smooth teardrop capsule body for standard Pikmin */
                        <path
                            d="M 50 40 C 35 40 32 64 32 74 C 32 86 40 94 50 94 C 60 94 68 86 68 74 C 68 64 65 40 50 40 Z"
                            fill={`url(#bodyGrad-${type})`}
                        />
                    )}

                    {/* Hands */}
                    {/* Left Hand */}
                    <circle cx={type === 'rock' ? 24 : 29} cy="70" r="3.5" fill={colors.shadow} />
                    {/* Right Hand */}
                    <circle cx={type === 'rock' ? 74 : 71} cy="70" r="3.5" fill={colors.shadow} />

                    {/* Eyes (Huge typical Pikmin eyes) */}
                    <g id="eyes">
                        {/* Left Eye */}
                        <ellipse cx="40" cy="54" rx="6" ry="9" fill="white" />
                        <circle cx="40" cy="54" r="3" fill="black" />
                        <circle cx="38.5" cy="51" r="1.2" fill="white" /> {/* Reflection */}

                        {/* Right Eye */}
                        <ellipse cx="60" cy="54" rx="6" ry="9" fill="white" />
                        <circle cx="60" cy="54" r="3" fill="black" />
                        <circle cx="58.5" cy="51" r="1.2" fill="white" /> {/* Reflection */}
                    </g>

                    {/* Red Pikmin: Sharp pointy nose */}
                    {type === 'red' && (
                        <path
                            d="M 50 56 Q 64 54 66 58 Q 64 62 50 60 Z"
                            fill={colors.primary}
                            stroke={colors.shadow}
                            strokeWidth="0.5"
                        />
                    )}

                    {/* Yellow Pikmin: Large pointy ears on sides */}
                    {type === 'yellow' && (
                        <g id="ears">
                            {/* Left Ear */}
                            <path
                                d="M 33 52 C 22 45 15 48 24 58 C 28 62 31 58 33 57"
                                fill={`url(#bodyGrad-${type})`}
                                stroke={colors.shadow}
                                strokeWidth="0.5"
                            />
                            {/* Right Ear */}
                            <path
                                d="M 67 52 C 78 45 85 48 76 58 C 72 62 69 58 67 57"
                                fill={`url(#bodyGrad-${type})`}
                                stroke={colors.shadow}
                                strokeWidth="0.5"
                            />
                        </g>
                    )}

                    {/* Blue Pikmin: Cute white rounded gills / open mouth */}
                    {type === 'blue' && (
                        <ellipse
                            cx="50"
                            cy="67"
                            rx="4"
                            ry="3"
                            fill="white"
                            stroke={colors.shadow}
                            strokeWidth="0.8"
                        />
                    )}
                </g>
            </g>
        </svg>
    );
}
