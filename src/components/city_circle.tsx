import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import { TileElement } from './tile';
import Token from './token';

import Point from '../point';

const DEFAULT_RADIUS: number = 19;
const STROKE_WIDTH: number = 2;

export interface CityCircleProps {
  readonly key?: string;
  readonly hex?: string;
  readonly onContextMenu?: any;
  readonly point: Point;
  readonly radius?: number;
  readonly token?: ReactElement<Token>;
}

export default class CityCircle
extends React.Component<CityCircleProps, undefined>
implements MapHexElement, TileElement {
  public static defaultProps: CityCircleProps = {
    radius: DEFAULT_RADIUS,
  } as CityCircleProps;

  static get DEFAULT_RADIUS(): number {
    return DEFAULT_RADIUS;
  }

  static get STROKE_WIDTH(): number {
    return STROKE_WIDTH;
  }

  get radius(): number {
    return this.props.radius;
  }

  get point(): Point {
    return this.props.point;
  }

  public render(): ReactElement<CityCircle> {
    return (
      <svg
      x={this.point.x - this.radius}
      y={this.point.y - this.radius}
      onContextMenu={ this.props.onContextMenu }>
        <circle
          cx={this.radius + STROKE_WIDTH / 2}
          cy={this.radius + STROKE_WIDTH / 2}
          r={this.radius}
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
