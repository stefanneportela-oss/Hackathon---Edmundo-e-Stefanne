import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import iconUrl from "../assets/logos/icon-only.svg";

/**
 * LogoHologram3D — holographic 3D reconstruction of the SENAI Soluções
 * Digitais logo icon, rendered with React Three Fiber / Three.js.
 *
 * The geometry is built from the EXACT logo icon SVG path (extracted from the
 * brand's own Logo-1.svg into icon-only.svg) and extruded with three.js'
 * SVGLoader, so the shape is a 1:1 match with the official mark — no manual
 * re-drawing. It is then given a cyber / holographic material.
 *
 * Visual language (per design brief):
 *  - Cyber / holographic material: translucent inner-glow faces + a subtle
 *    technical wireframe in Primary Blue (#0066FF) and electric cyan.
 *  - Neon ambient lighting reflecting on the absolute-black background.
 *  - Continuous soft-axis rotation + vertical bobbing (levitation).
 *  - Exploded-view: the icon's sub-shapes drift apart and back in layers.
 *  - Orbiting luminous particle field (point cloud).
 *  - Reactive mouse parallax tilt.
 *  - Responsive + respects reduced-motion.
 */

const PRIMARY = "#0066ff";
const CYAN = "#00e0ff";
const CYAN_SOFT = "#7fefff";

/* --------------------------------------------------------------------------
 * Load the exact logo icon SVG and turn each of its sub-paths into an
 * extruded 3D slab. Returns an array of { geometry, center } so each piece
 * can drift independently in the exploded view.
 * ------------------------------------------------------------------------ */
function useLogoIconGeometries(depth = 14) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    let cancelled = false;
    new SVGLoader().load(iconUrl, (data) => {
      if (cancelled) return;

      // Collect every shape from every path in the icon SVG.
      const shapes = [];
      data.paths.forEach((path) => {
        SVGLoader.createShapes(path).forEach((s) => shapes.push(s));
      });

      // Compute a shared bounding box so we can centre the whole mark and
      // normalise its scale to ~unit size regardless of the SVG's viewBox.
      const raw = shapes.map((shape) => {
        const g = new THREE.ExtrudeGeometry(shape, {
          depth,
          bevelEnabled: true,
          bevelThickness: 2,
          bevelSize: 1.5,
          bevelSegments: 2,
          steps: 1,
        });
        // SVG Y grows downward; flip so the icon is upright.
        g.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1));
        g.computeBoundingBox();
        return g;
      });

      // Global bounds of all sub-shapes combined.
      const globalBox = new THREE.Box3();
      raw.forEach((g) => globalBox.union(g.boundingBox));
      const globalCenter = new THREE.Vector3();
      globalBox.getCenter(globalCenter);
      const size = new THREE.Vector3();
      globalBox.getSize(size);
      const scale = 2.6 / Math.max(size.x, size.y); // fit into ~unit space

      const out = raw.map((g) => {
        // Recentre on the global centre, then scale to unit space.
        g.translate(-globalCenter.x, -globalCenter.y, -globalCenter.z);
        g.scale(scale, scale, scale);
        g.computeBoundingBox();
        const c = new THREE.Vector3();
        g.boundingBox.getCenter(c);
        // Outward drift direction for the exploded view.
        const dir = c.clone().normalize();
        return { geometry: g, dir: [dir.x, dir.y, dir.z || 0.3] };
      });

      setPieces(out);
    });
    return () => {
      cancelled = true;
    };
  }, [depth]);

  return pieces;
}

/* A single holographic slab: translucent glowing fill + technical wireframe. */
function HoloPiece({ geometry, color, dir, explode = 0 }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current || !dir) return;
    group.current.position.set(
      dir[0] * explode,
      dir[1] * explode,
      dir[2] * explode
    );
  });

  return (
    <group ref={group}>
      {/* Translucent inner-glow body */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.32}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.9}
          emissive={color}
          emissiveIntensity={0.65}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Technical wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

/* The assembled logo: exact icon sub-shapes with rotation, levitation and a
 * breathing exploded-view. */
function LogoAssembly({ reducedMotion }) {
  const root = useRef();
  const pieces = useLogoIconGeometries();
  const [explode, setExplode] = useState(0);

  useFrame((state, delta) => {
    if (!root.current) return;
    if (!reducedMotion) {
      root.current.rotation.y += delta * 0.35;
      root.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    const t = reducedMotion
      ? 0
      : (Math.sin(state.clock.elapsedTime * 0.7) * 0.5 + 0.5) * 0.15;
    setExplode(t);
  });

  return (
    <group ref={root} scale={1.15}>
      {pieces.map((p, i) => (
        <HoloPiece
          key={i}
          geometry={p.geometry}
          dir={p.dir}
          explode={explode}
          // Alternate the two brand blues across the sub-shapes.
          color={i % 2 === 0 ? CYAN : PRIMARY}
        />
      ))}
    </group>
  );
}

/* Orbiting luminous particle field (dust / point cloud). */
function ParticleField({ count = 140, reducedMotion }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
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
  const wrapRef = useRef(null);
  // Only run the WebGL render loop while the hologram is on screen — huge CPU/
  // GPU saving once the user scrolls past the hero.
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        // Cap the pixel ratio: rendering the WebGL scene at full 2x on retina
        // screens is a big GPU cost for little visual gain here.
        dpr={[1, 1.5]}
        // Pause the render loop entirely when scrolled out of view.
        frameloop={onScreen ? "always" : "never"}
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
