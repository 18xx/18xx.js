import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Point from '../point';

const SIDE_LENGTH: number = 64;
const HEIGHT: number = 2 * SIDE_LENGTH;
const WIDTH: number = SIDE_LENGTH * Math.sqrt(3);
const TILE_ORDER: List<string> = List([
  'yellow',
  'green',
  'brown',
  'gray'
]);

export interface TileProps {
  readonly color: string;
  readonly elements?: List<ReactElement<TileElement>>;
}

export interface TileElement {
  render(): ReactElement<any>;
}

export default class Tile extends React.Component<TileProps, undefined> {
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

  static get TILE_ORDER(): List<string> {
    return TILE_ORDER;
  }

  get hexColor(): string {
    let result: string = this.color;
    if (this.color === 'green') {
      result = 'limegreen';
    } else if (this.color === 'brown') {
      result = '#b0763f';
    } else if (this.color === 'gray') {
      result = '#bbb';
    }
    return result;
  }

  public get color(): string {
    return this.props.color;
  }

  public render(): ReactElement<Tile> {
    return (
      <svg
      xmlns='http://www.w3.org/2000/svg'
      height={HEIGHT}
      width={WIDTH}>
        <polygon key='bg'
          points={this.hexPoints().join(' ')}
          fill={this.hexColor} />
        {this.props.elements}
      </svg>
    );
  }

  private hexPoints(): List<Point> {
    return List([
      new Point(WIDTH / 2,  0),
      new Point(WIDTH, SIDE_LENGTH / 2),
      new Point(WIDTH, SIDE_LENGTH * 3 / 2),
      new Point(WIDTH / 2,  HEIGHT),
      new Point(0, SIDE_LENGTH * 3 / 2),
      new Point(0, SIDE_LENGTH / 2),
    ]);
  }
}
