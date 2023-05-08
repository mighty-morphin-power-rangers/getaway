import * as THREE from 'three';
import { Howl } from 'howler';
// import '../../../public/piano-mp3s/'
interface KeyProps {
  keyName: string;
  input: string;
  xOffset: number;
}

export default class Key {
  input: string;
  keyName: string;
  keyGroup: THREE.Group;
  axis: THREE.Vector3;
  point: THREE.Vector3;
  theta: number;
  sound: Howl;
  mesh: THREE.Mesh;
  isFlat: boolean;
  constructor({ keyName, input, xOffset }: KeyProps) {
    // got rid of socket
    this.input = input;
    this.keyName = keyName;
    this.keyGroup = new THREE.Group();
    this.axis = new THREE.Vector3(1, 0, 0);
    this.point = new THREE.Vector3(0, 20, 0);
    this.theta = Math.PI / 16;
    // this.socket = socket;

    this.sound = new Howl({
      src: [`piano-mp3s/${keyName}.mp3`],
      // onload: () => console.log(`${keyName} loaded`),
      // onloaderror: (id, err) => console.log(`Load error on ${keyName}:`, err),
      // onplayerror: (id, err) => console.log(`Play error on ${keyName}:`, err),
    });

    if (keyName.length === 3) {
      // is flat key
      const geometry = new THREE.BoxGeometry(6, 24, 4);
      const material = new THREE.MeshStandardMaterial({ color: 'black' });
      this.mesh = new THREE.Mesh(geometry, material);
      this.isFlat = true;
      this.mesh.position.x = xOffset;
      this.mesh.position.y = 8;
      this.mesh.position.z = 4;
      this.keyGroup.add(this.mesh);
    } else {
      // is natural key
      const geometry = new THREE.BoxGeometry(9, 40, 4);
      const material = new THREE.MeshStandardMaterial({ color: 'white' });
      this.mesh = new THREE.Mesh(geometry, material);
      this.isFlat = false;
      this.mesh.position.x = xOffset;
      this.keyGroup.add(this.mesh);
    }

    // this.socket.on("playKey", (data) => {
    //   if (data.keyName === this.keyName) {
    //     this.playKey(false); // Pass false to prevent playing sound immediately
    //   }
    // });
    // this.socket.on("releaseKey", (data) => {
    //   if (data.keyName === this.keyName) {
    //     this.releaseKey();
    //   }
    // });
  }

  rotateAroundWorldAxis(rotation: any) {
    // remove the offset
    this.keyGroup.position.sub(this.point);

    // rotate the POSITION
    this.keyGroup.position.applyAxisAngle(this.axis, this.theta * rotation);

    // re-add the offset
    this.keyGroup.position.add(this.point);

    // rotate the OBJECT
    this.keyGroup.rotateOnAxis(this.axis, this.theta * rotation);
  }
  playKey(local = true) {
    if (local) {
      (this.mesh.material as THREE.MeshStandardMaterial).color.set('limegreen');
    } else {
      (this.mesh.material as THREE.MeshStandardMaterial).color.set('red');
    }
    this.rotateAroundWorldAxis(1);
    console.log(this.keyName);
    this.sound.play();
    this.sound.fade(1, 0, 1000);
  }

  releaseKey() {
    if (this.isFlat) {
      (this.mesh.material as THREE.MeshStandardMaterial).color.set('black');
    } else {
      (this.mesh.material as THREE.MeshStandardMaterial).color.set('white');
    }
    this.rotateAroundWorldAxis(-1);
  }

  getKeyGroup() {
    return this.keyGroup;
  }
}
