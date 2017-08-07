import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import City from './city';
import CityCircle from './city_circle';
import Line from './line';
import Tile from './tile';

import Point from '../point';

class DistinctCity extends City {
  public render(): ReactElement<DistinctCity> {
    const tileElements: Array<ReactElement<any>> = [];

    if (this.props.spotLocations) {
      for (const num of this.props.spotLocations) {
        const cityPoint: Point = Point.from(
          this.hexagon.center,
          num + this.rotation + this.hexagon.offset,
          (Tile.WIDTH / 2) - this.cityCircleRadius - 4
        );

        tileElements.push(
          <Line key={num + this.rotation}
          point1={cityPoint}
          point2={Point.from(
            this.hexagon.center, num + this.rotation + this.hexagon.offset
          )} />,
          this.buildCircle(num, cityPoint),
        );
      }
    } else {
      throw new Error('DistinctCity requires spotLocations');
    }

    return (
      <g key='distinct-city'>{List(tileElements)}</g>
    );
  }

  get rotation(): number {
    return this.props.rotation || 0;
  }

  protected get cityCircleRadius(): number {
    // TODO: This should be based on if two things are next to one another
    if (this.props.spotLocations && this.props.spotLocations.length > 2) {
      return 17;
    } else {
      return CityCircle.DEFAULT_RADIUS;
    }
  }
}

export default DistinctCity;
