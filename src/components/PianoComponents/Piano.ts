import * as THREE from 'three';
import Key from './Key';

interface KeyProps {
  keyName: string;
  input: string;
  xOffset: number;
}

export default class Piano {
  pianoGroup: THREE.Group;
  flatKeys: Key[];
  naturalKeys: Key[];
  audioContext: AudioContext;

  constructor(audioContext: AudioContext) {
    this.flatKeys = [
      new Key({ keyName: 'Db4', input: 'w', xOffset: 5 - 30 }),
      new Key({ keyName: 'Eb4', input: 'e', xOffset: 15 - 30 }),
      new Key({ keyName: 'Gb4', input: 't', xOffset: 35 - 30 }),
      new Key({ keyName: 'Ab4', input: 'y', xOffset: 45 - 30 }),
      new Key({ keyName: 'Bb4', input: 'u', xOffset: 55 - 30 }),
    ];

    this.naturalKeys = [
      new Key({ keyName: 'C4', input: 'a', xOffset: 0 - 30 }),
      new Key({ keyName: 'D4', input: 's', xOffset: 10 - 30 }),
      new Key({ keyName: 'E4', input: 'd', xOffset: 20 - 30 }),
      new Key({ keyName: 'F4', input: 'f', xOffset: 30 - 30 }),
      new Key({ keyName: 'G4', input: 'g', xOffset: 40 - 30 }),
      new Key({ keyName: 'A4', input: 'h', xOffset: 50 - 30 }),
      new Key({ keyName: 'B4', input: 'j', xOffset: 60 - 30 }),
    ];
    // got rid of socket inside of constructor
    this.pianoGroup = new THREE.Group();
    // this.socket = socket;
    this.addFlatKeys();
    this.addNaturalKeys();
    this.audioContext = audioContext;
  }

  validKey(input: string): Key | undefined {
    const flatKey = this.flatKeys.find((key) => key.input === input);
    const naturalKey = this.naturalKeys.find((key) => key.input === input);
    return flatKey || naturalKey || undefined;
  }

  releaseKey(input: string): void {
    const validKey = this.validKey(input);
    if (validKey !== undefined) {
      validKey.releaseKey();
    }
  }

  pressKey(input: string, local = true): void {
    const validKey = this.validKey(input);
    if (validKey !== undefined) {
      validKey.playKey(local);
    }
  }

  addFlatKeys(): void {
    this.flatKeys.forEach((flatKey) => {
      this.pianoGroup.add(flatKey.getKeyGroup());
    });
  }

  addNaturalKeys(): void {
    this.naturalKeys.forEach((naturalKey) => {
      this.pianoGroup.add(naturalKey.getKeyGroup());
    });
  }

  getPianoGroup(): THREE.Group {
    return this.pianoGroup;
  }

  public getAudioContext(): AudioContext {
    return this.audioContext;
  }
}
