import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import City from './city';
import CityCircle from './city_circle';
import Tile from './tile';

import Point from '../point';

class UnconnectedCity extends City {
  public render(): ReactElement<UnconnectedCity> {
    let cities: List<ReactElement<CityCircle>>;
    if (this.props.num === 1) {
      cities = List([
        this.buildCircle(0, Tile.CENTER),
      ]);
    } else if (this.props.num === 2) {
      cities = List([
        this.buildCircle(0, new Point(Tile.CENTER.x - 20, Tile.CENTER.y - 10)),
        this.buildCircle(1, new Point(Tile.CENTER.x + 20, Tile.CENTER.y + 10)),
      ]);
    }
    return (
      <g key='unnconnected-cities'>
        {cities}
      </g>
    );
  }
}

export default UnconnectedCity;
