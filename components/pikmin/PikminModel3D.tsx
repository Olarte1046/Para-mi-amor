'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';

// ── Color palette mirrored from PikminSvg.tsx ──
const BODY_COLOR: Record<'red' | 'yellow' | 'blue' | 'rock', string> = {
    red: '#d92020',
    yellow: '#f0c000',
    blue: '#1850d0',
    rock: '#545464',
};

interface PikminMeshProps {
    type: 'red' | 'yellow' | 'blue' | 'rock';
}

function PikminMesh({ type }: PikminMeshProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const geometry = useLoader(STLLoader, '/models/pikmin-model.stl');

    // Center + fit geometry on first use
    React.useMemo(() => {
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const center = new THREE.Vector3();
        box.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        // Normalize scale so the model fits in a ~2-unit tall bounding box
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        geometry.scale(2 / maxDim, 2 / maxDim, 2 / maxDim);
    }, [geometry]);

    // Idle animation: gentle bob (Y) + slow rock (Y-axis rotation)
    const t = useRef(0);
    useFrame((_, delta) => {
        t.current += delta;
        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(t.current * 1.4) * 0.07;
            meshRef.current.rotation.y = Math.sin(t.current * 0.6) * 0.22; // ±~12.5°
        }
    });

    const color = BODY_COLOR[type];

    return (
        <mesh ref={meshRef} geometry={geometry} castShadow>
            <meshStandardMaterial
                color={color}
                roughness={0.55}
                metalness={0.1}
            />
        </mesh>
    );
}

// ── Fallback while STL loads ──
function LoadingFallback() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
    );
}

export interface PikminModel3DProps {
    type: 'red' | 'yellow' | 'blue' | 'rock';
    width?: number;
    height?: number;
    className?: string;
}

export default function PikminModel3D({
    type,
    width = 140,
    height = 140,
    className = '',
}: PikminModel3DProps) {
    return (
        <div style={{ width, height }} className={className}>
            <Suspense fallback={<LoadingFallback />}>
                <Canvas
                    style={{ width: '100%', height: '100%' }}
                    camera={{ position: [0.4, 0.5, 3], fov: 40 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* Lighting */}
                    <ambientLight intensity={0.65} />
                    <directionalLight position={[3, 6, 4]} intensity={1.25} castShadow />
                    <directionalLight position={[-2, 2, -2]} intensity={0.3} />

                    {/* Model */}
                    <Suspense fallback={null}>
                        <PikminMesh type={type} />
                    </Suspense>
                </Canvas>
            </Suspense>
        </div>
    );
}
