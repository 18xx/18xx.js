import { List } from 'immutable';
import * as _ from 'lodash';
import * as React from 'react';
import { ReactElement } from 'react';

import CityCircle from './city_circle';
import Tile from './tile';
import Token from './token';
import Town from './town';

import CityCircleFactory from '../city_circle_factory';
import Company from '../company';
import Hexagon from '../hexagon';
import Point from '../point';

export interface CityProps {
  hex?: string;
  hexagon: Hexagon;
  onRightClickCity: Function;
  onRightClickToken: Function;
  num: number;
  points?: List<Point>;
  rotation?: number;
  spotLocations?: number[]; // FIXME: Refactor out to distinct city
  tokenState: List<string>;
  homeTokens: List<string>;
}

export interface Station {
  render(): ReactElement<Station>;
}

export default class City
extends React.Component<CityProps, undefined>
implements Station {
  public static defaultProps: CityProps = {
    homeTokens: List<string>(),
    tokenState: List<string>(),
  } as CityProps;

  public render(): ReactElement<City> {
    const num: number = this.props.num;
    let result: ReactElement<any>;

    if (num === 1) {
      result = (
        this.buildCircle(0, this.hexagon.center)
      );
    } else if (num === 2) {
      const background: ReactElement<any> = (
        <rect
          x={this.hexagon.center.x - CityCircle.DEFAULT_RADIUS}
          y={this.hexagon.center.y - CityCircle.DEFAULT_RADIUS -
            CityCircle.STROKE_WIDTH / 2}
          width={CityCircle.DEFAULT_RADIUS * 2}
          height={CityCircle.DEFAULT_RADIUS * 2 + CityCircle.STROKE_WIDTH}
          fill='black'
        />
      );
      const circles: List<ReactElement<CityCircle>> = List([
        this.buildCircle(
          0,
          new Point(
            this.hexagon.center.x - CityCircle.DEFAULT_RADIUS,
            this.hexagon.center.y
          )
        ),
        this.buildCircle(
          1,
          new Point(
            this.hexagon.center.x + CityCircle.DEFAULT_RADIUS,
            this.hexagon.center.y
          )
        )
      ]);
      result = (
        <g key='cities'>
          {background}
          {circles}
        </g>
      );
    } else if (num === 3) {
      const hexPoints: List<Point> = List([
        new Point(
          this.hexagon.center.x - CityCircle.DEFAULT_RADIUS + 8,
          this.hexagon.center.y - 2 * CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x - 2 * CityCircle.DEFAULT_RADIUS + 1,
          this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x - 2 * CityCircle.DEFAULT_RADIUS + 1,
          this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x - CityCircle.DEFAULT_RADIUS + 8,
          this.hexagon.center.y + 2 * CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x + CityCircle.DEFAULT_RADIUS + 4,
          this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x + CityCircle.DEFAULT_RADIUS + 4,
          this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
        ),
      ]);

      const background: ReactElement<any> = (
        <polygon points={hexPoints.join(' ')} fill='black' />
      );

      const circles: List<ReactElement<CityCircle>> = List([
        this.buildCircle(
          0,
          new Point(
            this.hexagon.center.x - CityCircle.DEFAULT_RADIUS + 2,
            this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
          )
        ),
        this.buildCircle(
          1,
          new Point(
            this.hexagon.center.x - CityCircle.DEFAULT_RADIUS + 2,
            this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
          )
        ),
        this.buildCircle(
          2,
          new Point(
            this.hexagon.center.x + CityCircle.DEFAULT_RADIUS - 2,
            this.hexagon.center.y
          )
        ),
      ]);

      result = (
        <g key='cities'>
          {background}
          {circles}
        </g>
      );
    } else if (num === 4) {
      const hexPoints: List<Point> = List([
        new Point(
          this.hexagon.center.x - CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y - 2 * CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x - 2 * CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x - 2 * CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x - CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y + 2 * CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x + CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y + 2 * CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x + 2 * CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x + 2 * CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
        ),
        new Point(
          this.hexagon.center.x + CityCircle.DEFAULT_RADIUS,
          this.hexagon.center.y - 2 * CityCircle.DEFAULT_RADIUS
        ),
      ]);

      const background: ReactElement<any> = (
        <polygon points={hexPoints.join(' ')} fill='black' />
      );

      const circles: List<ReactElement<CityCircle>> = List([
        this.buildCircle(
          0,
          new Point(
            this.hexagon.center.x - CityCircle.DEFAULT_RADIUS,
            this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
          )
        ),
        this.buildCircle(
          1,
          new Point(
            this.hexagon.center.x - CityCircle.DEFAULT_RADIUS,
            this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
          )
        ),
        this.buildCircle(
          2,
          new Point(
            this.hexagon.center.x + CityCircle.DEFAULT_RADIUS,
            this.hexagon.center.y - CityCircle.DEFAULT_RADIUS
          )
        ),
        this.buildCircle(
          3,
          new Point(
            this.hexagon.center.x + CityCircle.DEFAULT_RADIUS,
            this.hexagon.center.y + CityCircle.DEFAULT_RADIUS
          )
        ),
      ]);

      result = (
        <g key='cities'>
          {background}
          {circles}
        </g>
      );
    } else if (num === 6) {
      const points: Point[] = _.times(6).map(n =>
        Point.from(this.hexagon.center, n, this.cityCircleRadius * 2),
      );
      const r: number = this.cityCircleRadius + CityCircle.STROKE_WIDTH / 2;

      const bgPoints: Point[] = _.flatten(
        _.times(6).map(n =>
          [
            Point.from(points[n], n - 0.5, r),
            Point.from(points[n], n + 0.5, r),
          ]
        )
      );

      const background: ReactElement<any> = (
        <polygon points={bgPoints.join(' ')} fill='black' />
      );

      const circles: List<ReactElement<CityCircle>> = List(
        points.map((point, idx) => this.buildCircle(idx, point))
      );

      result = (
        <g key='cities'>
          {background}
          {circles}
        </g>
      );
    } else {
      throw new Error('Unsupported number of cities');
    }

    return result;
  }

  protected get cityCircleRadius(): number {
    let result: number = CityCircle.DEFAULT_RADIUS;
    if (this.props.num === 6) {
      result -= 2;
    }
    return result;
  }

  protected buildCircle(index: number, point: Point): ReactElement<CityCircle> {
    const factory: CityCircleFactory = new CityCircleFactory(
      this.props.hex,
      this.props.homeTokens,
      this.props.onRightClickCity,
      this.props.onRightClickToken,
      this.props.tokenState,
      this.cityCircleRadius,
    );
    return factory.build(index, point);
  }

  protected get hexagon(): Hexagon {
    return this.props.hexagon;
  }
}
