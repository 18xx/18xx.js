import * as React from 'react';
import { ReactElement } from 'react';

import Line from './components/line';
import Tile, { TileElement } from './components/tile';

import Point from './point';

export default class TrackToCenter {
  constructor(private pos: number, private gague: string = 'standard') {
  }

  public element(): ReactElement<TileElement> {
    let overlay: ReactElement<Line>;
    if (this.gague === 'narrow') {
      overlay = (
        <Line
        key='overlay'
        point1={this.radianPoint()}
        point2={Tile.CENTER}
        stroke='white'
        strokeDasharray='10,10'
        strokeWidth={5}
        />
      );
    } else if (this.gague === 'dual') {
      overlay = (
        <Line
        key='overlay'
        point1={this.radianPoint()}
        point2={Tile.CENTER}
        stroke='white'
        strokeWidth={5}
        />
      );
    }
    return (
      <g key={'track-to-center-' + this.pos}>
        <Line
          key='base'
          point1={this.radianPoint()}
          point2={Tile.CENTER}
        />
        {overlay}
        <circle cx={Tile.CENTER.x} cy={Tile.CENTER.y} r='4' />
      </g>
    );
  }

  private radianPoint(): Point {
    return Point.fromCenter(this.pos);
  }
}
