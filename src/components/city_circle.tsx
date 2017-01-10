import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import { TileElement } from './tile';
import Token from './token';

import Point from '../point';

const RADIUS: number = 19;
const STROKE_WIDTH: number = 2;

export interface CityCircleProps {
  readonly key?: string;
  readonly hex?: string;
  readonly onContextMenu?: any;
  readonly point: Point;
  readonly token?: ReactElement<Token>;
}

export default class CityCircle
extends React.Component<CityCircleProps, undefined>
implements MapHexElement, TileElement {
  static get RADIUS(): number {
    return RADIUS;
  }

  static get STROKE_WIDTH(): number {
    return STROKE_WIDTH;
  }

  get point(): Point {
    return this.props.point;
  }

  public render(): ReactElement<CityCircle> {
    return (
      <svg
      x={this.point.x - RADIUS}
      y={this.point.y - RADIUS}
      onContextMenu={ this.props.onContextMenu }>
        <circle
          cx={RADIUS + STROKE_WIDTH / 2}
          cy={RADIUS + STROKE_WIDTH / 2}
          r={RADIUS}
          fill='white'
          stroke='#000'
          strokeWidth={STROKE_WIDTH}
          className='city-circle'
        />
        {this.props.token}
      </svg>
    );
  }
}
