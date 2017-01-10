import * as React from 'react';
import { ReactElement } from 'react';

import Tile, { TileElement } from './tile';

import Point from '../point';

export interface ValueProps {
  readonly amount: number;
  readonly position?: Point;
}

export default class Value
extends React.Component<ValueProps, undefined>
implements TileElement {

  public static defaultProps: any;

  constructor(props: ValueProps) {
    super(props);
  }

  public render(): ReactElement<Value> {
    if (this.props.amount) {
      return (
        <g key='city-amount'>
          <circle
            key='city-amount-circle'
            cx={this.props.position.x}
            cy={this.props.position.y}
            r='9'
            fill='white'
            stroke='#000'
            strokeWidth='2'
          />
          <text
            key='city-amount-text'
            x={this.props.position.x}
            y={this.props.position.y + 4}
            textAnchor='middle'
            fill='black'
            fontSize='11'
          >{this.props.amount}</text>
        </g>
      );
    }
  }
}

Value.defaultProps = {
  position: new Point(Tile.CENTER.x, 112),
};
