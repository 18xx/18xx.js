import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import Hexagon from '../hexagon';

const FONT_SIZE: number = 8;

export interface PrivateReservationProps {
  readonly hexagon: Hexagon;
  readonly name: string;
}

class PrivateReservation extends React.Component<PrivateReservationProps, {}> {
  public render(): ReactElement<PrivateReservation> {
    return (
      <g>
        <circle cx={this.left} cy={this.y - 15} r={4} />
        <circle cx={this.left} cy={this.y + 15} r={4} />
        <line x1={this.left} y1={this.y - 15}
        x2={this.left} y2={this.y + 15}
        strokeWidth={2} stroke='black' />
        <text
          x={this.textX}
          y={this.textY}
          textAnchor='start'
          fill='black'
          fontSize={FONT_SIZE}
        >{this.props.name}</text>
      </g>
    );
  }

  private get left(): number {
    let result: number = 10;
    if (this.props.hexagon.orientation === 'north-south') {
      result = 20;
    }
    return result;
  }

  private get textX(): number {
    let result: number = this.left - 8;
    if (this.props.hexagon.orientation === 'north-south') {
      result = this.left + 4;
    }
    return result;
  }

  private get y(): number {
    return this.props.hexagon.center.y;
  }

  private get textY(): number {
    let result: number = (Tile.HEIGHT * 3 / 4) - 2;
    if (this.props.hexagon.orientation === 'north-south') {
      result = this.y + 2;
    }
    return result;
  }
}

export default PrivateReservation;
