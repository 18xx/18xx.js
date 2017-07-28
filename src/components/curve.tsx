import * as React from 'react';
import { ReactElement } from 'react';

import { TileElement } from './tile';

import Point from '../point';

interface CurveProps {
  readonly point1: Point;
  readonly point2: Point;
  readonly radius: number;
  readonly stroke?: string;
  readonly strokeDasharray?: string;
  readonly strokeWidth?: number;
}

class Curve extends React.Component<CurveProps, {}> implements TileElement {
  public static defaultProps: Partial<CurveProps> = {
    stroke: 'black',
    strokeDasharray: '1,0',
    strokeWidth: 8,
  };

  public render(): ReactElement<Curve> {
    const dValues: string = [
      'M' + this.props.point1.x,
      this.props.point1.y,
      'A',
      this.props.radius,
      this.props.radius,
      0,
      '0,0',
      this.props.point2.x,
      this.props.point2.y,
    ].map(val => val.toString()).join(' ');

    return (
      <path
        d={dValues}
        fill='none'
        stroke={this.props.stroke}
        strokeDasharray={this.props.strokeDasharray}
        strokeWidth={this.props.strokeWidth}
      />
    );
  }
}

export default Curve;
