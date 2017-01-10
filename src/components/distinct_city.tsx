import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import City from './city';
import CityCircle from './city_circle';
import Line from './line';
import Tile from './tile';

import Point from '../point';

export default class DistinctCity extends City {
  public render(): ReactElement<DistinctCity> {
    const tileElements: Array<ReactElement<any>> = [];

    let i: number = 0;
    for (const num of this.props.spotLocations) {
      const cityPoint: Point = Point.fromCenter(num + this.rotation, 32);

      tileElements.push(
        <Line key={num + this.rotation}
        point1={cityPoint}
        point2={Point.fromCenter(num + this.rotation)} />,
        this.buildCircle(i, cityPoint),
      );
      i += 1;
    }

    return (
      <g key='distinct-city'>{List(tileElements)}</g>
    );
  }

  get rotation(): number {
    return this.props.rotation;
  }
}
