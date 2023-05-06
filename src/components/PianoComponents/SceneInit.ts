import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  WebGLRendererParameters,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  Clock,
  Uniform,
  AmbientLight,
  SpotLight,
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

// type UniformType = {
//   [uniform: string]: { type: string; value: number | Color };
// };

type UniformNumber = {
  type: string;
  value: number;
};

type UniformColor = {
  type: string;
  value: THREE.Color;
};
type UniformType = {
  u_time: UniformNumber;
  colorA: UniformColor;
  colorB: UniformColor;
};
class MyClass {
  myProp!: string;
}

export default class SceneInit {
  fov: number;
  camera!: PerspectiveCamera;
  clock!: Clock;
  scene!: Scene;
  uniforms!: UniformType;
  renderer!: WebGLRenderer;
  controls!: OrbitControls;
  stats!: Stats;

  constructor(fov = 36) {
    this.fov = fov;

    // this.scene.background = new THREE.Color('hotpink');
  }

  initScene(canvas: HTMLCanvasElement): void {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.z = 196;

    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('lightskyblue');

    // NOTE: Load space background.
    // this.loader = new THREE.TextureLoader();
    // this.scene.background = this.loader.load('./pics/space.jpeg');

    // NOTE: Declare uniforms to pass into glsl shaders.
    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
      colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    };

    // specify a canvas which is already created in the HTML file and tagged by an id
    // aliasing enabled
    // this.renderer = new THREE.WebGLRenderer({
    //   canvas,
    //   antialias: true,
    // });
    const parameters: WebGLRendererParameters = {
      canvas,
      antialias: true,
    };
    this.renderer = new WebGLRenderer(parameters);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.stats = new Stats();
    // document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    this.scene.add(ambientLight);

    // spot light which is illuminating the chart directly
    let spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    this.scene.add(spotLight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  animate(): void {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
  }

  render(): void {
    // NOTE: Update uniform data on each render.
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
