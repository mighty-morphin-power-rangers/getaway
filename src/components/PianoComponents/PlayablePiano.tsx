import React, { useEffect, useRef } from 'react';
// import { io } from "socket.io-client";
import * as THREE from 'three';
import SceneInit from './SceneInit';
import Piano from './Piano';

const PlayablePiano = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pianoRef = useRef<Piano | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const sceneInit = new SceneInit();
      sceneInit.initScene(canvasRef.current);
      sceneInit.animate();

      const piano = new Piano();
      pianoRef.current = piano;

      sceneInit.scene.add(piano.getPianoGroup());

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) {
          return;
        }
        pianoRef.current?.pressKey(e.key);
      };

      const onKeyUp = (e: KeyboardEvent) => {
        pianoRef.current?.releaseKey(e.key);
      };

      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PlayablePiano;
