"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Tunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    material: THREE.ShaderMaterial;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
        },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;

        //Constants
        #define TAU 6.2831853071795865

        //Parameters
        #define TUNNEL_LAYERS 96
        #define RING_POINTS 128
        #define POINT_SIZE 1.8
        #define POINT_COLOR_A vec3(1.0)
        #define POINT_COLOR_B vec3(0.7)
        #define SPEED 0.7

        //Square of x
        float sq(float x) {
          return x*x;   
        }

        //Angular repeat
        vec2 AngRep(vec2 uv, float angle) {
          vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
          polar.x = mod(polar.x + angle / 2.0, angle) - angle / 2.0; 
          return polar.y * vec2(cos(polar.x), sin(polar.x));
        }

        //Signed distance to circle
        float sdCircle(vec2 uv, float r) {
          return length(uv) - r;
        }

        //Mix a shape defined by a distance field 'sd' with a 'target' color using the 'fill' color.
        vec3 MixShape(float sd, vec3 fill, vec3 target) {
          float blend = smoothstep(0.0, 1.0/iResolution.y, sd);
          return mix(fill, target, blend);
        }

        //Tunnel/Camera path
        vec2 TunnelPath(float x) {
          vec2 offs = vec2(0, 0);
          
          offs.x = 0.2 * sin(TAU * x * 0.5) + 0.4 * sin(TAU * x * 0.2 + 0.3);
          offs.y = 0.3 * cos(TAU * x * 0.3) + 0.2 * cos(TAU * x * 0.1);
          
          offs *= smoothstep(1.0, 4.0, x);
          
          return offs;
        }

        void main() {
          vec2 res = iResolution.xy / iResolution.y;
          vec2 uv = gl_FragCoord.xy / iResolution.y;
          
          uv -= res/2.0;
          
          vec3 color = vec3(0);
          
          float repAngle = TAU / float(RING_POINTS);
          float pointSize = POINT_SIZE/2.0/iResolution.y;
          
          float camZ = iTime * SPEED;
          vec2 camOffs = TunnelPath(camZ);
          
          for(int i = 1; i <= TUNNEL_LAYERS; i++) {
            float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
            
            //Scroll the points towards the screen
            pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
            
            //Layer x/y offset
            vec2 offs = TunnelPath(camZ + pz) - camOffs;
            
            //Radius of the current ring
            float ringRad = 0.15 * (1.0 / sq(pz * 0.8 + 0.4));
            
            //Only draw points when uv is close to the ring.
            if(abs(length(uv + offs) - ringRad) < pointSize * 1.5) {
              //Angular repeated uv coords
              vec2 aruv = AngRep(uv + offs, repAngle);

              //Distance to the nearest point
              float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);

              //Stripes
              vec3 ptColor = (mod(float(i / 2), 2.0) == 0.0) ? POINT_COLOR_A : POINT_COLOR_B;
              
              //Distance fade
              float shade = (1.0-pz);

              color = MixShape(pdist, ptColor * shade, color);
            }
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Animation variables
    let lastTime = 0;
    const speedMultiplier = 0.5;

    // Animation loop
    function animate(time: number) {
      time *= 0.001; // Convert to seconds
      const deltaTime = time - lastTime;
      lastTime = time;

      shaderMaterial.uniforms.iTime.value += deltaTime * speedMultiplier;

      renderer.render(scene, camera);

      const animationId = requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    }

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      shaderMaterial.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
        1
      );
    };

    window.addEventListener("resize", handleResize);

    // Store scene references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      material: shaderMaterial,
      animationId: 0,
    };

    // Start animation
    animate(0);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.material.dispose();
        geometry.dispose();
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen -z-10"
    />
  );
}

// Showcase Component for Tunnel
export function TunnelShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    material: THREE.ShaderMaterial;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Get container dimensions
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Initialize Three.js scene
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Shader material (same as original)
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector3(width, height, 1),
        },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;

        //Constants
        #define TAU 6.2831853071795865

        //Parameters
        #define TUNNEL_LAYERS 96
        #define RING_POINTS 128
        #define POINT_SIZE 1.8
        #define POINT_COLOR_A vec3(0.0, 1.0, 1.0)
        #define POINT_COLOR_B vec3(1.0, 0.2, 0.8)
        #define SPEED 0.7

        //Square of x
        float sq(float x) {
          return x*x;   
        }

        //Angular repeat
        vec2 AngRep(vec2 uv, float angle) {
          vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
          polar.x = mod(polar.x + angle / 2.0, angle) - angle / 2.0; 
          return polar.y * vec2(cos(polar.x), sin(polar.x));
        }

        //Signed distance to circle
        float sdCircle(vec2 uv, float r) {
          return length(uv) - r;
        }

        //Mix a shape defined by a distance field 'sd' with a 'target' color using the 'fill' color.
        vec3 MixShape(float sd, vec3 fill, vec3 target) {
          float blend = smoothstep(0.0, 1.0/iResolution.y, sd);
          return mix(fill, target, blend);
        }

        //Tunnel/Camera path
        vec2 TunnelPath(float x) {
          vec2 offs = vec2(0, 0);
          
          offs.x = 0.2 * sin(TAU * x * 0.5) + 0.4 * sin(TAU * x * 0.2 + 0.3);
          offs.y = 0.3 * cos(TAU * x * 0.3) + 0.2 * cos(TAU * x * 0.1);
          
          offs *= smoothstep(1.0, 4.0, x);
          
          return offs;
        }

        void main() {
          vec2 res = iResolution.xy / iResolution.y;
          vec2 uv = gl_FragCoord.xy / iResolution.y;
          
          uv -= res/2.0;
          
          vec3 color = vec3(0);
          
          float repAngle = TAU / float(RING_POINTS);
          float pointSize = POINT_SIZE/2.0/iResolution.y;
          
          float camZ = iTime * SPEED;
          vec2 camOffs = TunnelPath(camZ);
          
          for(int i = 1; i <= TUNNEL_LAYERS; i++) {
            float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
            
            //Scroll the points towards the screen
            pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
            
            //Layer x/y offset
            vec2 offs = TunnelPath(camZ + pz) - camOffs;
            
            //Radius of the current ring
            float ringRad = 0.15 * (1.0 / sq(pz * 0.8 + 0.4));
            
            //Only draw points when uv is close to the ring.
            if(abs(length(uv + offs) - ringRad) < pointSize * 1.5) {
              //Angular repeated uv coords
              vec2 aruv = AngRep(uv + offs, repAngle);

              //Distance to the nearest point
              float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);

              //Stripes
              vec3 ptColor = (mod(float(i / 2), 2.0) == 0.0) ? POINT_COLOR_A : POINT_COLOR_B;
              
              //Distance fade
              float shade = (1.0-pz);

              color = MixShape(pdist, ptColor * shade, color);
            }
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Animation variables
    let lastTime = 0;
    const speedMultiplier = 0.8;

    // Animation loop
    function animate(time: number) {
      time *= 0.001; // Convert to seconds
      const deltaTime = time - lastTime;
      lastTime = time;

      shaderMaterial.uniforms.iTime.value += deltaTime * speedMultiplier;

      renderer.render(scene, camera);

      const animationId = requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    }

    // Handle resize for showcase container
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      
      renderer.setSize(newWidth, newHeight);
      shaderMaterial.uniforms.iResolution.value.set(newWidth, newHeight, 1);
    };

    window.addEventListener("resize", handleResize);

    // Store scene references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      material: shaderMaterial,
      animationId: 0,
    };

    // Start animation
    animate(0);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.material.dispose();
        geometry.dispose();
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">3D Tunnel Effect</h3>
        <p className="text-sm text-muted-foreground mb-6">
          An immersive 3D tunnel animation using WebGL shaders. Features dynamic camera movement and colorful ring patterns.
        </p>
      </div>

      <div className="space-y-6">
        {/* Showcase Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-96 rounded-lg overflow-hidden border bg-black"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
          
          {/* Overlay content */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4 text-cyan-400">TUNNEL VISION</h2>
              <p className="text-lg opacity-80">Experience the infinite journey</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">WebGL Shaders</h4>
            <p className="text-sm text-muted-foreground">
              Powered by custom GLSL fragment shaders for smooth performance
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Dynamic Path</h4>
            <p className="text-sm text-muted-foreground">
              Camera follows a sinusoidal path creating organic movement
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Infinite Loop</h4>
            <p className="text-sm text-muted-foreground">
              Seamlessly looping animation with 96 layers and 128 ring points
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}