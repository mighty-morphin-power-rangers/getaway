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
      new Key({ keyName: 'Db3', input: '2', xOffset: 5 - 65 }),
      new Key({ keyName: 'Eb3', input: '3', xOffset: 15 - 65 }),
      new Key({ keyName: 'Gb3', input: '5', xOffset: 35 - 65 }),
      new Key({ keyName: 'Ab3', input: '6', xOffset: 45 - 65 }),
      new Key({ keyName: 'Bb3', input: '7', xOffset: 55 - 65 }),

      new Key({ keyName: 'Db4', input: 's', xOffset: 75 - 65 }),
      new Key({ keyName: 'Eb4', input: 'd', xOffset: 85 - 65 }),
      new Key({ keyName: 'Gb4', input: 'g', xOffset: 105 - 65 }),
      new Key({ keyName: 'Ab4', input: 'h', xOffset: 115 - 65 }),
      new Key({ keyName: 'Bb4', input: 'j', xOffset: 125 - 65 }),
    ];

    this.naturalKeys = [
      new Key({ keyName: 'B2', input: '1', xOffset: -10 - 65 }),
      new Key({ keyName: 'C3', input: 'q', xOffset: 0 - 65 }),
      new Key({ keyName: 'D3', input: 'w', xOffset: 10 - 65 }),
      new Key({ keyName: 'E3', input: 'e', xOffset: 20 - 65 }),
      new Key({ keyName: 'F3', input: 'r', xOffset: 30 - 65 }),
      new Key({ keyName: 'G3', input: 't', xOffset: 40 - 65 }),
      new Key({ keyName: 'A3', input: 'y', xOffset: 50 - 65 }),
      new Key({ keyName: 'B3', input: 'u', xOffset: 60 - 65 }),
      new Key({ keyName: 'C4', input: 'z', xOffset: 70 - 65 }),
      new Key({ keyName: 'D4', input: 'x', xOffset: 80 - 65 }),
      new Key({ keyName: 'E4', input: 'c', xOffset: 90 - 65 }),
      new Key({ keyName: 'F4', input: 'v', xOffset: 100 - 65 }),
      new Key({ keyName: 'G4', input: 'b', xOffset: 110 - 65 }),
      new Key({ keyName: 'A4', input: 'n', xOffset: 120 - 65 }),
      new Key({ keyName: 'B4', input: 'm', xOffset: 130 - 65 }),
      new Key({ keyName: 'C5', input: ',', xOffset: 140 - 65 }),
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
