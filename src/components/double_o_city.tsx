import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Point from '../point';
import Track from '../track';

import City from './city';
import CityCircle from './city_circle';
import Tile from './tile';

class DoubleOCity extends City {
  public render(): ReactElement<DoubleOCity> {
    let result: ReactElement<any>;

    if (this.props.num === 2) {
      const offset: number = 12;

      const circles: List<ReactElement<CityCircle>> = List([
        this.buildCircle(0, new Point(
          Tile.CENTER.x - (CityCircle.DEFAULT_RADIUS + offset),
          Tile.CENTER.y - CityCircle.DEFAULT_RADIUS
        )),
        this.buildCircle(2, new Point(
          Tile.CENTER.x - (CityCircle.DEFAULT_RADIUS + offset),
          Tile.CENTER.y + CityCircle.DEFAULT_RADIUS
        )),
        this.buildCircle(1, new Point(
          Tile.CENTER.x + (CityCircle.DEFAULT_RADIUS + offset),
          Tile.CENTER.y - CityCircle.DEFAULT_RADIUS
        )),
        this.buildCircle(3, new Point(
          Tile.CENTER.x + (CityCircle.DEFAULT_RADIUS + offset),
          Tile.CENTER.y + CityCircle.DEFAULT_RADIUS
        )),
      ]);

      const background: List<ReactElement<any>> = List([
        <rect
          key='bg-1'
          x={Tile.CENTER.x - CityCircle.DEFAULT_RADIUS * 2 - offset}
          y={Tile.CENTER.y - CityCircle.DEFAULT_RADIUS}
          width={CityCircle.DEFAULT_RADIUS * 2}
          height={CityCircle.DEFAULT_RADIUS * 2 + CityCircle.STROKE_WIDTH}
          fill='black' />,
        <rect
          key='bg-2'
          x={Tile.CENTER.x + offset}
          y={Tile.CENTER.y - CityCircle.DEFAULT_RADIUS}
          width={CityCircle.DEFAULT_RADIUS * 2}
          height={CityCircle.DEFAULT_RADIUS * 2 + CityCircle.STROKE_WIDTH}
          fill='black'
        />,
      ]);

      const transformStr: string =
        `rotate(120 ${Tile.CENTER.x} ${Tile.CENTER.y})`;

      // FIXME: Only works for NYC tile
      result = (
        <g key='cities' transform={transformStr}>
          {background}
          {circles}
        </g>
      );
    } else {
      result = (
        <g key='cities'>
          {this.props.points.map((point, idx) => this.buildCircle(idx, point))}
        </g>
      );
    }

    return result;
  }

  protected labelPosition(): Point {
    return Tile.CENTER;
  }
}

export default DoubleOCity;
