import { List } from 'immutable';

import Tile from './components/tile';

import Point from './point';

class Hexagon {
  constructor(public orientation: string | undefined) {
  }

  public get offset(): number {
    let result: number = 0;
    if (this.orientation === 'north-south') {
      result = 0.5;
    }
    return result;
  }

  public get height(): number {
    let result: number = 2 * Tile.SIDE_LENGTH;
    if (this.orientation === 'north-south') {
      result = Tile.SIDE_LENGTH * Math.sqrt(3);
    }
    return result;
  }

  public get width(): number {
    let result: number = Tile.SIDE_LENGTH * Math.sqrt(3);
    if (this.orientation === 'north-south') {
      result = 2 * Tile.SIDE_LENGTH;
    }
    return result;
  }

  public get hexTop(): number {
    return 0.25 * this.height;
  }

  public get hexBottom(): number {
    return 0.75 * this.height;
  }

  public get hexLeft(): number {
    return  0.25 * this.width;
  }

  public get hexRight(): number {
    return 0.75 * this.width;
  }

  public get center(): Point {
    return new Point(this.width / 2, this.height / 2);
  }

  public hexPoints(): List<string> {
    let result: List<string>;
    if (this.orientation === 'north-south') {
      result = List([
        `${this.hexLeft},${0}`,
        `${this.hexRight},${0}`,
        `${this.width},${this.height / 2}`,
        `${this.hexRight},${this.height}`,
        `${this.hexLeft},${this.height}`,
        `${0},${this.height / 2}`
      ]);
    } else {
      result = List([
        `${0},${this.hexTop}`,
        `${this.width / 2},${0}`,
        `${this.width},${this.hexTop}`,
        `${this.width},${this.hexBottom}`,
        `${this.width / 2},${this.height}`,
        `${0},${this.hexBottom}`
      ]);
    }
    return result;
  }
}

export default Hexagon;
