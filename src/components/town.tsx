import { List } from 'immutable';
import * as React from 'react';
import { Component, ReactElement } from 'react';

import { Station } from './city';
import { TileElement } from './tile';

import Point from '../point';

const DEFAULT_RADIUS: number = 10;

export interface TownProps {
  borderColor?: string;
  points: List<Point>;
}

class Town extends Component<TownProps, {}> implements Station, TileElement {
  public render(): ReactElement<Town> {
    return (
      <g key='towns'>
        {this.props.points.map(p => this.drawCircle(p))}
      </g>
    );
  }

  protected drawCircle(point: Point): ReactElement<any> {
    return (
      <circle
        key={`${point.x}-${point.y}`}
        cx={point.x}
        cy={point.y}
        fill='black'
        r={DEFAULT_RADIUS}
        strokeWidth={2}
        stroke={this.props.borderColor}
      />
    );
  }
}

export default Town;
