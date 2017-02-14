import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { Station } from './city';
import { TileElement } from './tile';

import Point from '../point';

const RADIUS: number = 10;

export interface TownProps {
  points: List<Point>;
}

export default class Town
extends React.Component<TownProps, undefined>
implements Station, TileElement {
  public render(): ReactElement<Town> {
    return (
      <g key='towns'>
        {this.props.points.map(p => this.drawCircle(p))}
      </g>
    );
  }

  private drawCircle(point: Point): ReactElement<any> {
    return (
      <circle
        key={`${point.x}-${point.y}`}
        cx={point.x}
        cy={point.y}
        fill='black'
        r={RADIUS}
      />
    );
  }
}
