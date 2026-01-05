"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface SpaceProps {
  planetPath?: string;
  astronautPath?: string;
  groundPath?: string;
}

export default function Space({
  planetPath = "/models/planet.glb",
  astronautPath = "/models/astronaut.glb",
  groundPath = "/models/space-ground.glb",
}: SpaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Hardcoded values
    const backgroundColor = "transparent";
    const enableControls = true;
    //scene setup
    const scene = new THREE.Scene();
    if (backgroundColor !== "transparent") {
      scene.background = new THREE.Color(backgroundColor);
    }

    //camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2.5, 19);
    camera.lookAt(0, 0, 0);

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      container.clientWidth || 300,
      container.clientHeight || 150,
      false
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) {
        return;
      }
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight, false);
    });
    resizeObserver.observe(container);

    //lighting
    const hemiLight = new THREE.HemisphereLight(0xff_ff_ff, 0x44_44_44, 1.5);
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xff_ff_ff, 2);
    dirLight.position.set(5, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    scene.add(dirLight);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.maxDistance = 25;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.enabled = enableControls;

    const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer | null = null;
    let planet: THREE.Object3D | null = null;
    let animationFrameId: number;

    //GLTF Loader
    const loader = new GLTFLoader();

    function loadAstronaut() {
      loader.load(
        astronautPath,
        (gltf) => {
          const astronaut = gltf.scene;
          astronaut.scale.set(0.05, 0.05, 0.05);
          astronaut.position.set(0, 0.1, 0);

          astronaut.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).castShadow = true;
              (child as THREE.Mesh).receiveShadow = true;
            }
          });

          scene.add(astronaut);

          if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(astronaut);
            gltf.animations.forEach((clip) => {
              mixer?.clipAction(clip).play();
            });
          }
        },
        undefined,
        (error) => console.error("Error loading astronaut:", error)
      );
    }

    function loadGround() {
      loader.load(
        groundPath,
        (gltf) => {
          const ground = gltf.scene;
          ground.position.set(-2, -5, 0);
          ground.scale.set(3, 3, 3);

          ground.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).receiveShadow = true;
            }
          });

          scene.add(ground);
          loadAstronaut();
        },
        undefined,
        (error) => console.error("Error loading ground:", error)
      );
    }

    loader.load(
      planetPath,
      (gltf) => {
        planet = gltf.scene;
        planet.position.set(-5, -1, -40);
        planet.scale.set(1.5, 1.5, 1.5);
        planet.rotation.y = Math.PI / 10;

        planet.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).receiveShadow = false;
            (child as THREE.Mesh).castShadow = false;
          }
        });

        scene.add(planet);
        loadGround();
      },
      undefined,
      (error) => console.error("Error loading planet:", error)
    );

    //animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (planet) {
        planet.rotation.y += 0.1 * delta;
      }
      if (mixer) {
        mixer.update(delta);
      }

      controls.update();
      renderer.render(scene, camera);
    }

    //handle resizing
    function onWindowResize() {
      const container = containerRef.current;
      if (!container) {
        return;
      }
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", onWindowResize);
    animate();

    //final Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onWindowResize);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [planetPath, astronautPath, groundPath]);

  const className = "";

  return (
    <div
      className={`relative z-10 ${className}`}
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        minHeight: 300,
        background: "black",
      }}
    >
      {/* UI Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col text-white">
        <header className="w-full p-6">
          <nav className="pointer-events-auto flex items-center justify-end space-x-8 text-lg">
            <a className="transition-colors hover:text-sky-300" href="#">
              Home
            </a>
            <a className="transition-colors hover:text-sky-300" href="#">
              About
            </a>
            <a className="transition-colors hover:text-sky-300" href="#">
              Projects
            </a>
            <a className="transition-colors hover:text-sky-300" href="#">
              Contact
            </a>
          </nav>
        </header>
        <main className="flex flex-grow flex-col items-center justify-end pb-16 text-center">
          <h1 className="pointer-events-auto font-extrabold text-5xl uppercase tracking-wider">
            <span className="underline decoration-2 decoration-sky-400 underline-offset-8">
              Space Theme
            </span>
          </h1>
        </main>
      </div>
    </div>
  );
}
