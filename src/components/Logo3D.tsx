import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified 3D Logo Component with manual geometry creation
function AnimatedLogo() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  // Create geometries and materials manually to avoid drei compatibility issues
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(0.8, 0.8, 0.8), []);
  const octaGeometry = useMemo(() => new THREE.OctahedronGeometry(0.6), []);

  const sphereMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: "#00BFFF",
      emissive: "#003366",
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.8,
    }), []
  );

  const boxMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: "#0099CC",
      emissive: "#002244",
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.9,
    }), []
  );

  const octaMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: "#33CCFF",
      emissive: "#001122",
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.7,
    }), []
  );

  const particleMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: "#66DDFF",
      emissive: "#004466",
      emissiveIntensity: 0.5,
    }), []
  );

  const particleGeometry = useMemo(() => new THREE.SphereGeometry(0.05, 8, 8), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 2) * 0.3;
      sphereRef.current.rotation.z = time * 0.5;
    }
    
    if (boxRef.current) {
      boxRef.current.rotation.x = time * 0.3;
      boxRef.current.rotation.z = time * 0.4;
    }
    
    if (octaRef.current) {
      octaRef.current.rotation.y = time * 0.6;
      octaRef.current.position.x = Math.cos(time * 1.5) * 0.5;
    }
  });

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      positions.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ]);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main Sphere */}
      <mesh ref={sphereRef} position={[0, 0, 0]} geometry={sphereGeometry} material={sphereMaterial} />
      
      {/* Rotating Box */}
      <mesh ref={boxRef} position={[2, 0, 0]} geometry={boxGeometry} material={boxMaterial} />
      
      {/* Octahedron */}
      <mesh ref={octaRef} position={[-2, 0, 0]} geometry={octaGeometry} material={octaMaterial} />
      
      {/* Ambient particles */}
      {particlePositions.map((position, i) => (
        <mesh
          key={i}
          position={position}
          geometry={particleGeometry}
          material={particleMaterial}
        />
      ))}
    </group>
  );
}

// Main Logo3D Component with Error Boundary
const Logo3D: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Add mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // This will be used by the animation loop
      canvasRef.current.style.setProperty('--mouse-x', x.toString());
      canvasRef.current.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <React.Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl font-bold gradient-text animate-pulse">HT</div>
        </div>
      }>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: true, 
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance"
          }}
          onCreated={(state) => {
            // Ensure WebGL context is properly initialized
            state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
          <pointLight position={[-10, -10, 5]} intensity={0.5} color="#33CCFF" />
          <directionalLight position={[0, 5, 5]} intensity={0.8} color="#FFFFFF" />
          
          {/* Logo */}
          <AnimatedLogo />
        </Canvas>
      </React.Suspense>
      
      {/* Glow Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-xl pointer-events-none" />
    </div>
  );
};

export default Logo3D;