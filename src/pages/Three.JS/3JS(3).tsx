import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Torus1 = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const torusRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null!);

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();

    // Create a geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3);
    // Create a material
    const material = new THREE.MeshNormalMaterial();

    // Combine geometry and material to create a mesh
    const torus = new THREE.Mesh(geometry, material);
    torusRef.current = torus; // Assign the mesh to the ref object

    // Add the mesh to our scene
    scene.add(torus);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;


    //MOUSE MOVEMENT
    // Create a renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(1250, 700);
renderer.setClearColor(0x0000ff, 0); // Set the background color to blue
renderer.domElement.style.borderRadius = "30px"; // Set the border radius to 10 pixels

// Add event listeners to the renderer's DOM element
renderer.domElement.addEventListener('mousedown', onMouseDown);
renderer.domElement.addEventListener('mouseup', onMouseUp);
renderer.domElement.addEventListener('mousemove', onMouseMove);

// Set initial rotation values
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};
let rotation = {
  x: 0,
  y: 0
};

function onMouseDown(event: MouseEvent) {
  isDragging = true;
}

function onMouseUp(event: MouseEvent) {
  isDragging = false;
  torusRef.current.rotation.x = 0;
  torusRef.current.rotation.y = 0;
}
function onMouseMove(event: MouseEvent) {
  const deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y
  };

  if (isDragging) {
    const deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        'XYZ'
      ));

    torusRef.current.quaternion.multiplyQuaternions(deltaRotationQuaternion, torusRef.current.quaternion);
  }

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}
//MOUSE MOVEMENT
    // Attach the renderer to our ref's current DOM node
    const mountNode = mountRef.current;
    if (mountNode) {
      mountNode.appendChild(renderer.domElement);
    }

    const animate = function () {
      requestAnimationFrame(animate);

      const cycleDuration = 8; // 4 seconds for inhale + 4 seconds for exhale
      const elapsedSeconds = clock.getElapsedTime() % cycleDuration;

      let scaleFactor = 1; // default scale factor

      if (elapsedSeconds < 4) {
        // inhale phase (0-4 seconds)
        scaleFactor = (elapsedSeconds / 4) * 0.25 + 1;
      } else {
        // exhale phase (4-8 seconds)
        scaleFactor = ((8 - elapsedSeconds) / 4) * 0.25 + 1;
      }
      // Scale the torus mesh based on the scale factor
      torusRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function to unmount the renderer
    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="three-container" />;
};

export default Torus1;



