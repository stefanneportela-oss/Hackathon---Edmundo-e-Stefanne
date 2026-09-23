import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * LogoHologram3D — holographic 3D reconstruction of the SENAI Soluções
 * Digitais logo icon, rendered with React Three Fiber / Three.js.
 *
 * Visual language (per design brief):
 *  - Cyber / holographic material: translucent inner-glow faces + a subtle
 *    technical wireframe in Primary Blue (#0066FF) and electric cyan.
 *  - Neon ambient lighting reflecting on the absolute-black background.
 *  - Continuous soft-axis rotation + vertical bobbing (levitation).
 *  - Exploded-view: the icon's geometric parts drift apart and back in layers.
 *  - Orbiting luminous particle field (point cloud) for a hi-tech projection.
 *  - Reactive mouse parallax tilt.
 *  - Responsive: scales down on small screens, respects reduced-motion.
 *
 * The icon is reconstructed as two interlocking angular "elbow" modules (the
 * paralelogram-fold shapes that make up the SENAI SD mark), each extruded into
 * a 3D slab, plus small connective nodes.
 */

const PRIMARY = "#0066ff";
const CYAN = "#00e0ff";
const CYAN_SOFT = "#7fefff";

/* --------------------------------------------------------------------------
 * Geometry: build one angular "elbow" module of the logo mark.
 * The shape is a folded parallelogram (a chevron-like bracket). We build it
 * as a 2D THREE.Shape then extrude it to give the holographic slab depth.
 * ------------------------------------------------------------------------ */
function useElbowGeometry(depth = 0.34) {
  return useMemo(() => {
    const s = new THREE.Shape();
    // A stylised bracket / elbow (top bar + descending leg), normalised units.
    s.moveTo(-0.9, 0.9);
    s.lineTo(0.9, 0.9);
    s.lineTo(0.9, 0.5);
    s.lineTo(-0.4, 0.5);
    s.lineTo(-0.4, -0.5);
    s.lineTo(0.9, -0.5);
    s.lineTo(0.9, -0.9);
    s.lineTo(-0.9, -0.9);
    s.closePath();

    const geo = new THREE.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
      steps: 1,
    });
    geo.center();
    return geo;
  }, [depth]);
}

/* A single holographic slab: translucent glowing fill + technical wireframe. */
function HoloPiece({ geometry, color = CYAN, position, rotation, explode = 0, dir }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current || !dir) return;
    // Exploded-view offset along the piece's own outward direction.
    group.current.position.set(
      position[0] + dir[0] * explode,
      position[1] + dir[1] * explode,
      position[2] + dir[2] * explode
    );
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Translucent inner-glow body */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.28}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.8}
          emissive={color}
          emissiveIntensity={0.6}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Technical wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/* Small connective node cubes that float between the modules. */
function Node({ position, color = CYAN_SOFT }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.16, 0.16, 0.16]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} />
    </mesh>
  );
}

/* The assembled logo hologram: two elbow modules + nodes, with rotation,
 * levitation and a breathing exploded-view. */
function LogoAssembly({ reducedMotion }) {
  const root = useRef();
  const geo = useElbowGeometry();
  const [explode, setExplode] = useState(0);

  useFrame((state, delta) => {
    if (!root.current) return;
    if (!reducedMotion) {
      // Continuous soft-axis rotation.
      root.current.rotation.y += delta * 0.35;
      root.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    }
    // Breathing exploded view (0 .. 0.35).
    const t = reducedMotion ? 0 : (Math.sin(state.clock.elapsedTime * 0.7) * 0.5 + 0.5) * 0.35;
    setExplode(t);
  });

  return (
    <group ref={root} scale={1.15}>
      {/* Module A — upper/front elbow */}
      <HoloPiece
        geometry={geo}
        color={CYAN}
        position={[-0.28, 0.32, 0.18]}
        rotation={[0, 0, 0]}
        explode={explode}
        dir={[-0.6, 0.7, 0.4]}
      />
      {/* Module B — lower/back elbow, mirrored to interlock */}
      <HoloPiece
        geometry={geo}
        color={PRIMARY}
        position={[0.28, -0.32, -0.18]}
        rotation={[0, Math.PI, Math.PI]}
        explode={explode}
        dir={[0.6, -0.7, -0.4]}
      />
      {/* Connective floating nodes */}
      <Node position={[0.0, 0.0, 0.55]} />
      <Node position={[0.55, 0.55, -0.2]} color={CYAN} />
      <Node position={[-0.55, -0.55, 0.2]} color={PRIMARY} />
    </group>
  );
}

/* Orbiting luminous particle field (dust / point cloud). */
function ParticleField({ count = 260, reducedMotion }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical shell around the icon.
      const r = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={CYAN_SOFT}
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/* Reactive mouse-parallax tilt applied to the whole scene rig. */
function ParallaxRig({ children, reducedMotion }) {
  const rig = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (!rig.current || reducedMotion) return;
    // Smoothly ease the rig toward the pointer position.
    rig.current.rotation.y = THREE.MathUtils.lerp(
      rig.current.rotation.y,
      pointer.x * 0.4,
      0.05
    );
    rig.current.rotation.x = THREE.MathUtils.lerp(
      rig.current.rotation.x,
      -pointer.y * 0.3,
      0.05
    );
  });

  return <group ref={rig}>{children}</group>;
}

export default function LogoHologram3D({ className = "" }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        {/* Neon ambient + key lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 5]} intensity={2.2} color={CYAN} />
        <pointLight position={[-5, -3, -2]} intensity={1.6} color={PRIMARY} />
        <pointLight position={[0, 0, 3]} intensity={1.1} color={CYAN_SOFT} />

        <Suspense fallback={null}>
          <ParallaxRig reducedMotion={reducedMotion}>
            <Float
              speed={reducedMotion ? 0 : 1.4}
              rotationIntensity={reducedMotion ? 0 : 0.4}
              floatIntensity={reducedMotion ? 0 : 1.1}
              floatingRange={[-0.15, 0.15]}
            >
              <LogoAssembly reducedMotion={reducedMotion} />
            </Float>
            <ParticleField reducedMotion={reducedMotion} />
          </ParallaxRig>
        </Suspense>
      </Canvas>

      {/* Soft radial glow behind the canvas (reflects on black) */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,110,255,0.28),transparent_62%)] blur-2xl" />
    </div>
  );
}
