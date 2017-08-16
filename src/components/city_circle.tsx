import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import { TileElement } from './tile';

import Point from '../point';

const DEFAULT_RADIUS: number = 19;
const STROKE_WIDTH: number = 2;

export interface CityCircleInitProps {
  readonly key?: string;
  readonly hex: string;
  readonly index: number;
  readonly point: Point;
  readonly radius?: number;
}

export interface CityCircleMappedProps {
  readonly onContextMenu?: (hex: string, index: number) => void;
}

export type CityCircleProps = CityCircleInitProps & CityCircleMappedProps;

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
    const fn: (event: MouseEvent<SVGElement>) => void =
      (event: MouseEvent<SVGElement>) => {
        event.preventDefault();
        if (this.props.onContextMenu) {
          this.props.onContextMenu(this.props.hex, this.props.index);
        }
      };
    return (
      <svg x={this.point.x - r} y={this.point.y - r} onContextMenu={fn}>
        {this.circle(r)}
        {this.props.children}
      </svg>
    );
  }

  private circle(r: number): ReactElement<SVGCircleElement> {
    return (
      <circle
      cx={r}
      cy={r}
      r={this.radius}
      fill='white'
      stroke='#000'
      strokeWidth={STROKE_WIDTH}
      className='city-circle'
      />
    );
  }
}

export default CityCircle;
