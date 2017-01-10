import * as React from 'react';
import { ReactElement } from 'react';

import { TileElement } from './tile';

import Point from '../point';

interface LineProps {
  readonly point1: Point;
  readonly point2: Point;
}

export default class Line
extends React.Component<LineProps, undefined>
implements TileElement {
  public render(): ReactElement<Line> {
    return (
      <line
        x1={this.props.point1.x}
        y1={this.props.point1.y}
        x2={this.props.point2.x}
        y2={this.props.point2.y}
        stroke='black'
        strokeWidth='8'
      />
    );
  }
}
