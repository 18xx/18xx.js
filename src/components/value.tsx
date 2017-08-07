import * as React from 'react';
import { ReactElement } from 'react';

import Tile, { TileElement } from './tile';

import Hexagon from '../hexagon';
import Point from '../point';

const RADIUS: number = 9;

export interface ValueProps {
  readonly amount: number;
  readonly hexagon: Hexagon;
  readonly position?: Point;
}

class Value extends React.Component<ValueProps, {}> implements TileElement {
  public render(): ReactElement<Value> {
    return (
      <g key='city-amount'>
        <circle
          key='city-amount-circle'
          cx={this.position.x}
          cy={this.position.y}
          r={RADIUS}
          fill='white'
          stroke='#000'
          strokeWidth='2'
        />
        <text
          key='city-amount-text'
          x={this.position.x}
          y={this.position.y + 4}
          textAnchor='middle'
          fill='black'
          fontSize='11'
        >{this.props.amount}</text>
      </g>
    );
  }

  private get position(): Point {
    let result: Point | undefined = this.props.position;
    if (!result) {
      if (this.props.hexagon.orientation === 'north-south') {
        result = new Point(
          this.props.hexagon.width - RADIUS * 1.6,
          this.props.hexagon.height / 2,
        );
      } else {
        result = new Point(this.props.hexagon.center.x, 112);
      }
    }
    return result;
  }
}

export default Value;
