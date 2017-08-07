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

class CityCircle extends React.Component<CityCircleProps, {}>
implements MapHexElement, TileElement {
  public static defaultProps: Partial<CityCircleProps> = {
    radius: DEFAULT_RADIUS,
  };

  static get DEFAULT_RADIUS(): number {
    return DEFAULT_RADIUS;
  }

  static get STROKE_WIDTH(): number {
    return STROKE_WIDTH;
  }

  get radius(): number {
    return this.props.radius!;
  }

  get point(): Point {
    return this.props.point;
  }

  public render(): ReactElement<CityCircle> {
    const r: number = this.radius + STROKE_WIDTH / 2;
    return (
      <svg
      x={this.point.x - r}
      y={this.point.y - r}
      onContextMenu={ this.props.onContextMenu }>
        <circle
          cx={r}
          cy={r}
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

export default CityCircle;
