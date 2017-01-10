import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import Tile, { TileElement } from './tile';

const HEIGHT: number = 20;
const WIDTH: number = 20;

export interface DynamicValuesProps {
  readonly fixedHeight?: number;
  readonly values: any; // FIXME: Should not be any
}

export default class DynamicValues
extends React.Component<DynamicValuesProps, undefined>
implements MapHexElement, TileElement {
  public static defaultProps: any;

  public get values(): any {
    return this.props.values;
  }

  public render(): ReactElement<DynamicValues> {
    let x: number = Tile.CENTER.x - 20 - (10 * Object.keys(this.values).length);

    const results: List<ReactElement<any>> = List(
      Object.keys(this.values).map((key: string) => {
        const value: number = this.values[key];
        x += WIDTH;
        return this.colorSquare(x, key, value);
      }));

    return (
      <g>{results}</g>
    );
  }

  private colorSquare(
    x: number,
    fill: string,
    value: number): ReactElement<any> {

    const y: number = this.props.fixedHeight;
    return (
      <g key={x}>
        <rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          fill={fill}
          stroke='black' />
        <text
          textAnchor='middle'
          x={x + (WIDTH / 2)}
          y={y + 15}>
          {value}
        </text>
      </g>
    );
  }
}

DynamicValues.defaultProps = {
  fixedHeight: (Tile.CENTER.y - 25),
};
