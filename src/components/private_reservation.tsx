import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

interface PrivateReservationProps {
  name: string;
}

export default class PrivateReservation
extends React.Component<PrivateReservationProps, undefined> {
  public render(): ReactElement<PrivateReservation> {
    return (
      <g>
        <circle cx={10} cy={45} r={4} />
        <circle cx={10} cy={75} r={4} />
        <line x1={10} y1={45} x2={10} y2={75} strokeWidth={2} stroke='black' />
        <text
          x={2}
          y={(Tile.HEIGHT * 3 / 4) - 2}
          textAnchor='start'
          fill='black'
          fontSize={Tile.SIDE_LENGTH / 8}
        >{this.props.name}</text>
      </g>
    );
  }
}
