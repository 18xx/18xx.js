import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import CityCircle from './city_circle';
import Tile from './tile';
import Value from './value';

import Point from '../point';

export const HEX_TOP: number =  0.25 * Tile.HEIGHT;
export const HEX_BOTTOM: number = 0.75 * Tile.HEIGHT;

const HEX_POINTS: List<string> = List([
  `${0},${HEX_TOP}`,
  `${Tile.CENTER.x},${0}`,
  `${Tile.WIDTH},${HEX_TOP}`,
  `${Tile.WIDTH},${HEX_BOTTOM}`,
  `${Tile.CENTER.x},${Tile.HEIGHT}`,
  `${0},${HEX_BOTTOM}`
]);

export interface MapHexProps {
  readonly column: number;
  readonly elements?: List<MapHexElement>;
  readonly fill?: string;
  readonly onHexClick?: any;
  readonly row: string;
  readonly tile?: ReactElement<Tile>;
}

export interface MapHexElement {
  toString(): string;
}

export default class MapHex
  extends React.Component<MapHexProps, undefined> {

  public static defaultProps: any;

  get row(): string {
    return this.props.row;
  }

  get column(): number {
    return this.props.column;
  }

  get absoluteLeft(): number {
    return (this.column - 1) * Tile.WIDTH * 0.5;
  }

  get absoluteTop(): number {
    return (this.row.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)) *
      Tile.HEIGHT * 0.75;
  }

  get absoluteCenter(): Point {
    return new Point(
      this.absoluteLeft + Tile.WIDTH / 2,
      this.absoluteTop + Tile.HEIGHT / 2,
    );
  }

  get hex(): string {
    return `${this.row}${this.column}`;
  }

  public render(): ReactElement<MapHex> {
    return (
      <svg
        x={this.absoluteLeft}
        y={this.absoluteTop}
        className='hex'
        onClick={ () => this.props.onHexClick(this) }>
        <polygon
          points={HEX_POINTS.join(' ')}
          fill={this.props.fill}
          stroke='black'/>

        {this.props.elements}
        {this.props.tile}
      </svg>
    );
  }
}

MapHex.defaultProps = {
  elements: List([]),
  fill: '#efe',
};
