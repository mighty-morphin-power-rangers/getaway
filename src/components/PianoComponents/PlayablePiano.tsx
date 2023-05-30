import React, { useEffect, useRef } from 'react';
// import { io } from "socket.io-client";
import * as THREE from 'three';
import SceneInit from './SceneInit';
import Piano from './Piano';

const PlayablePiano = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pianoRef = useRef<Piano | null>(null);
  // add container
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const sceneInit = new SceneInit();
      // sceneInit.initScene(canvasRef.current);
      sceneInit.initScene(canvasRef.current, containerRef.current);
      sceneInit.animate();

      const audioContext = new AudioContext();

      const piano = new Piano(audioContext);
      pianoRef.current = piano;

      sceneInit.scene.add(piano.getPianoGroup());

      // const context = new (window.AudioContext || window.webkitAudioContext)();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) {
          return;
        }
        audioContext.resume().then(() => {
          // console.log('Playback resumed successfully');
        });

        pianoRef.current?.pressKey(e.key);
      };

      const onKeyUp = (e: KeyboardEvent) => {
        pianoRef.current?.releaseKey(e.key);
      };

      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      document.addEventListener('click', function () {
        audioContext.resume().then(() => {
          // console.log('Playback resumed successfully');
        });
      });

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        document.removeEventListener('click', function () {
          audioContext.resume().then(() => {
            // console.log('Playback resumed successfully');
          });
        });
      };
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '50%', height: '600px' }}>
    <canvas ref={canvasRef} ></canvas>
    </div>
  );
};

export default PlayablePiano;
