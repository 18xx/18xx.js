import * as React from 'react';
import { ReactElement } from 'react';

import Line from './components/line';
import Tile, { TileElement } from './components/tile';

import Hexagon from './hexagon';
import Point from './point';

class TrackToCenter {
  constructor(
    private pos: number,
    private hexagon: Hexagon,
    private gague: string = 'standard'
  ) {
  }

  public element(): ReactElement<TileElement> {
    let overlay: ReactElement<Line>;
    if (this.gague === 'narrow') {
      overlay = (
        <Line
        key='overlay'
        point1={this.radianPoint()}
        point2={this.hexagon.center}
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
        point2={this.hexagon.center}
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
          point2={this.hexagon.center}
        />
        {overlay}
        <circle cx={this.hexagon.center.x} cy={this.hexagon.center.y} r='4' />
      </g>
    );
  }

  private radianPoint(): Point {
    return Point.from(this.hexagon.center, this.pos + this.hexagon.offset);
  }
}

export default TrackToCenter;
