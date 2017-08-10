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

  public hexPoints(): List<Point> {
    let result: List<Point>;
    if (this.orientation === 'north-south') {
      result = List([
        new Point(this.hexRight, 0),
        new Point(this.hexLeft, 0),
        new Point(0, this.height / 2),
        new Point(this.hexLeft, this.height),
        new Point(this.hexRight, this.height),
        new Point(this.width, this.height / 2),
      ]);
    } else {
      result = List([
        new Point(this.width, this.hexTop),
        new Point(this.width / 2, 0),
        new Point(0, this.hexTop),
        new Point(0, this.hexBottom),
        new Point(this.width / 2, this.height),
        new Point(this.width, this.hexBottom),
      ]);
    }
    return result;
  }
}

export default Hexagon;
