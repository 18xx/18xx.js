import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Point from '../point';

const SIDE_LENGTH: number = 64;
const HEIGHT: number = 2 * SIDE_LENGTH;
const WIDTH: number = SIDE_LENGTH * Math.sqrt(3);

export interface TileProps {
  readonly color: string;
  readonly elements?: List<ReactElement<TileElement>>;
  readonly orientation: string;
}

export interface TileElement {
  render(): ReactElement<any>;
}

class Tile extends React.Component<TileProps, undefined> {
  static get SIDE_LENGTH(): number {
    return SIDE_LENGTH;
  }

  static get HEIGHT(): number {
    return HEIGHT;
  }

  static get WIDTH(): number {
    return WIDTH;
  }

  static get CENTER(): Point {
    return new Point(WIDTH / 2, HEIGHT / 2);
  }

  public static modifiedHexColor(color: string): string {
    let result: string = color;
    if (color === 'green') {
      result = 'limegreen';
    } else if (color === 'brown') {
      result = '#b0763f';
    } else if (color === 'gray') {
      result = '#bbb';
    }
    return result;
  }

  get hexColor(): string {
    return Tile.modifiedHexColor(this.color);
  }

  public get color(): string {
    return this.props.color;
  }

  public render(): ReactElement<Tile> {
    return (
      <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${this.width} ${this.height}`}
      height={this.height}
      width={this.width}>
        <polygon key='bg'
          points={this.hexPoints().join(' ')}
          fill={this.hexColor} />
        {this.props.elements}
      </svg>
    );
  }

  private get height(): number {
    let result: number = 2 * Tile.SIDE_LENGTH;
    if (this.props.orientation === 'north-south') {
      result = Tile.SIDE_LENGTH * Math.sqrt(3);
    }
    return result;
  }

  private get width(): number {
    let result: number = Tile.SIDE_LENGTH * Math.sqrt(3);
    if (this.props.orientation === 'north-south') {
      result = 2 * Tile.SIDE_LENGTH;
    }
    return result;
  }

  private get hexTop(): number {
    return 0.25 * this.height;
  }

  private get hexBottom(): number {
    return 0.75 * this.height;
  }

  private get hexLeft(): number {
    return  0.25 * this.width;
  }

  private get hexRight(): number {
    return 0.75 * this.width;
  }

  // TODO: This is duplicated from MapHex
  private hexPoints(): List<string> {
    let result: List<string>;
    if (this.props.orientation === 'north-south') {
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

export default Tile;
