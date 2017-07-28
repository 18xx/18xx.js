import * as React from 'react';
import { ReactElement } from 'react';

import { TileElement } from './tile';

import Point from '../point';

interface LineProps {
  readonly point1: Point;
  readonly point2: Point;
  readonly stroke?: string;
  readonly strokeDasharray?: string;
  readonly strokeWidth?: number;
}

class Line extends React.Component<LineProps, {}> implements TileElement {
  public static defaultProps: Partial<LineProps> = {
    stroke: 'black',
    strokeDasharray: '1,0',
    strokeWidth: 8,
  };

  public render(): ReactElement<Line> {
    return (
      <line
        x1={this.props.point1.x}
        y1={this.props.point1.y}
        x2={this.props.point2.x}
        y2={this.props.point2.y}
        stroke={this.props.stroke}
        strokeDasharray={this.props.strokeDasharray}
        strokeWidth={this.props.strokeWidth}
      />
    );
  }
}

export default Line;
