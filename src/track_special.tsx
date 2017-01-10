import * as React from 'react';
import { ReactElement } from 'react';

import { TileElement } from './components/tile';

import Point from './point';
import Track from './track';

export default class TrackSpecial extends Track {
  public element(): ReactElement<TileElement> {
    const point0: Point = this.trackPoints()[0];
    const point1: Point = this.trackPoints()[1];

    // FIXME: Only works for PRR Tile
    const mid: Point = new Point(point0.x / 2, point0.y - 30);

    const pathElements0: string[] = [
      'M' + point0.x,
      point0.y.toString(),
      'C',
      mid.x.toString(),
      point0.y.toString(),
      ',',
      point0.x.toString(),
      mid.y.toString(),
      ',',
      mid.x.toString(),
      mid.y.toString()
    ];
    const pathElements1: string[] = [
      'M' + point1.x,
      point1.y.toString(),
      'C',
      mid.x.toString(),
      point1.y.toString(),
      ',',
      point1.x.toString(),
      mid.y.toString(),
      ',',
      mid.x.toString(),
      mid.y.toString()
    ];

    return (
      <g key='special-track'>
        {this.buildCurve(0, pathElements0)}
        {this.buildCurve(1, pathElements1)}
      </g>
    );
  }

  private buildCurve(
    key: string | number, pathElements: string[]
  ): ReactElement<any> {
    return (
      <path
      key={key}
      d={pathElements.join(' ')}
      stroke='black'
      strokeWidth={8}
      fill='transparent'/>
    );
  }
}
