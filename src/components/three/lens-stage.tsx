"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useCallback, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Vision Auto's signature section.
 *
 * The whole frame sits out of focus and drained toward the stone of their wall.
 * A single glass lens travels with the pointer, and only inside it does the
 * photograph resolve: refracted, magnified, with the colour fringing a real
 * lens leaves at its rim. "Your vision, our drive", done literally.
 *
 * Deliberately not an HDR-lit transmission material — drei's Environment
 * presets fetch a map at runtime and render unlit in production. This is a
 * hand-written screen-space refraction, so it needs no external asset.
 */

// Written straight to clip space from a unit plane. Sizing a mesh from the
// camera frustum instead leaves the quad smaller than the canvas under an
// orthographic camera, which shows up as the photograph filling only a band
// across the top of the section.
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uTex;
  uniform vec2  uRes;      // canvas pixels
  uniform vec2  uImg;      // texture pixels
  uniform vec2  uLens;     // lens centre, 0..1 in canvas space
  uniform float uRadius;   // lens radius, fraction of the smaller axis
  uniform float uPresence; // 0 = no lens at all, 1 = full strength
  uniform vec3  uStone;

  varying vec2 vUv;

  // Fill the canvas the way object-fit: cover would, so a wide viewport never
  // leaves bands and a portrait source never squashes.
  vec2 coverUv(vec2 uv) {
    float scale = max(uRes.x / uImg.x, uRes.y / uImg.y);
    vec2 size = uImg * scale;
    return (uv * uRes - (uRes - size) * 0.5) / size;
  }

  // Two concentric 8-tap rings. Randomised tap radii smear photographic
  // content into streaks; even rings read as an out-of-focus plane, which is
  // what a defocused showroom should look like.
  vec3 blurred(vec2 uv, float radius) {
    if (radius < 0.0006) return texture2D(uTex, uv).rgb;
    vec2 agr = vec2(1.0, uRes.x / uRes.y);
    vec3 sum = texture2D(uTex, uv).rgb * 1.4;
    float total = 1.4;
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.7854; // 45 degrees
      vec2 dirv = vec2(cos(a), sin(a)) * agr;
      sum += texture2D(uTex, uv + dirv * radius * 0.55).rgb;
      sum += texture2D(uTex, uv + dirv * radius).rgb * 0.8;
      total += 1.8;
    }
    return sum / total;
  }

  void main() {
    vec2 uv = coverUv(vUv);

    // Work in aspect-corrected space so the lens stays circular.
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    vec2 c = vec2(uLens.x * aspect, uLens.y);
    float dist = length(p - c);
    float radius = max(uRadius, 0.0001);
    float d = dist / radius;

    // --- outside the lens: defocused, drained toward the wall's stone ---
    float outFalloff = smoothstep(1.0, 2.6, d);
    float blurAmt = mix(0.0018, 0.0062, outFalloff) * uPresence;
    vec3 outer = blurred(uv, blurAmt);
    float lum = dot(outer, vec3(0.299, 0.587, 0.114));
    outer = mix(outer, mix(vec3(lum), uStone, 0.5), 0.22 * uPresence);
    outer *= mix(1.0, 0.9, outFalloff * uPresence);

    if (uPresence < 0.001) {
      gl_FragColor = vec4(outer, 1.0);
      return;
    }

    // --- inside the lens: spherical refraction + dispersion ---
    // Treat the lens as a glass sphere cap: the surface normal tips further
    // from vertical toward the rim, so the sampled point walks outward.
    float h = sqrt(max(0.0, 1.0 - d * d));
    vec2 dir = dist > 0.00001 ? (p - c) / dist : vec2(0.0);
    float bend = (1.0 - h) * 0.12 * radius;

    // Refraction plus a touch of magnification, so the lens reads as glass
    // rather than as a hole cut in a mask. Both act in canvas space, then get
    // un-stretched by the aspect on the way back into uv.
    vec2 unstretch = vec2(1.0 / aspect, 1.0);
    vec2 shift = (dir * bend + (p - c) * 0.012) * unstretch;
    // Dispersion: red bends least, blue most, exactly as glass does.
    vec2 disp = dir * bend * smoothstep(0.35, 1.0, d) * 0.07 * unstretch;

    vec3 inner = vec3(
      texture2D(uTex, coverUv(vUv - shift - disp)).r,
      texture2D(uTex, coverUv(vUv - shift)).g,
      texture2D(uTex, coverUv(vUv - shift + disp)).b
    );

    // Glass gains a little contrast and light.
    inner = (inner - 0.5) * 1.06 + 0.5;
    inner *= 1.035;

    // Rim: a bright meniscus just inside the edge, and a soft shadow just out.
    float rim = smoothstep(0.80, 0.99, d) * (1.0 - smoothstep(0.99, 1.02, d));
    inner += rim * 0.22;
    float shade = smoothstep(1.0, 1.14, d) * (1.0 - smoothstep(1.14, 1.34, d));

    float mask = 1.0 - smoothstep(0.975, 1.005, d);
    vec3 col = mix(outer, inner, mask * uPresence);
    col *= 1.0 - shade * 0.16 * uPresence;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function LensPlane({
  src,
  presence,
  onReady,
}: {
  src: string;
  presence: number;
  onReady: () => void;
}) {
  const tex = useTexture(src);
  const { size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  // Lens position is smoothed toward the pointer so it feels like glass being
  // carried, not a cursor sprite.
  const target = useRef(new THREE.Vector2(0.5, 0.52));
  const current = useRef(new THREE.Vector2(0.5, 0.52));

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    // useTexture has already suspended until decode, so by here the frame is
    // genuinely on the GPU and the plain <img> underneath can be released.
    onReady();
  }, [tex, onReady]);

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uRes: { value: new THREE.Vector2(1, 1) },
      uImg: { value: new THREE.Vector2(1, 1) },
      uLens: { value: new THREE.Vector2(0.5, 0.52) },
      uRadius: { value: 0.23 },
      uPresence: { value: 0 },
      uStone: { value: new THREE.Color("#cdbfa7") },
    }),
    [tex],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!mat.current) return;
    const k = 1 - Math.pow(0.0022, delta);
    current.current.lerp(target.current, k);
    const u = mat.current.uniforms;
    u.uLens.value.copy(current.current);
    u.uRes.value.set(size.width, size.height);
    const img = tex.image as { width?: number; height?: number } | undefined;
    u.uImg.value.set(img?.width ?? 1, img?.height ?? 1);
    u.uPresence.value += (presence - u.uPresence.value) * (1 - Math.pow(0.01, delta));
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/**
 * use-webgl-health only reports a context that was created and then *lost*.
 * A browser that refuses one outright (blocklisted GPU, hardened privacy mode)
 * makes r3f throw on mount instead, so probe before rendering the Canvas.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function LensStage({ src, alt }: { src: string; alt: string }) {
  const { lost, bind } = useWebglHealth();
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => setSupported(canRenderWebgl()), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // A lost context, a reduced-motion preference, or a browser without WebGL
  // all land on the same honest fallback: their photograph, in full focus.
  // `supported === null` is the pre-probe first paint, which also shows it.
  if (lost || reduced || supported !== true) {
    return (
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    );
  }

  return (
    <>
      {/* Held under the canvas so the section is never empty while the
          texture decodes, and so the frame is real content for crawlers. */}
      <img
        src={src}
        alt={alt}
        aria-hidden={ready}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* The positioning lives on a wrapper, not on <Canvas>. R3F sizes its
          drawing buffer from the element it is handed, and an absolutely
          positioned Canvas measures before layout settles — which collapses
          the render to a thin band across the top. */}
      <div className="absolute inset-0">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          dpr={[1, 1.75]}
          gl={{ antialias: false, alpha: false }}
          onCreated={({ gl }) => bind(gl.domElement)}
        >
          {/* useTexture suspends while the frame decodes; without a boundary
              that would bubble past the Canvas and blank the section. */}
          <Suspense fallback={null}>
            <LensPlane src={src} presence={1} onReady={onReady} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
