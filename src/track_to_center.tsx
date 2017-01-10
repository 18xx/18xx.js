import * as React from 'react';
import { ReactElement } from 'react';

import Line from './components/line';
import Tile, { TileElement } from './components/tile';

import Point from './point';

export default class TrackToCenter {
  constructor(public pos: number) {
    this.pos = pos;
  }

  public element(): ReactElement<TileElement> {
    return (
      <g key={'track-to-center-' + this.pos}>
        <Line
          point1={this.radianPoint()}
          point2={Tile.CENTER}
        />
        <circle cx={Tile.CENTER.x} cy={Tile.CENTER.y} r='4' />
      </g>
    );
  }

  private radianPoint(): Point {
    return Point.fromCenter(this.pos);
  }
}
