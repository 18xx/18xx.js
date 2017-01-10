import * as React from 'react';
import { ReactElement } from 'react';

import { TileElement } from './tile';

import Point from '../point';

interface CurveProps {
  readonly point1: Point;
  readonly point2: Point;
  readonly radius: number;
}

export default class Curve
extends React.Component<CurveProps, undefined>
implements TileElement {

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
        stroke='black'
        strokeWidth='8'
      />
    );
  }
}
