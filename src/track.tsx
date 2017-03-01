import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Tile, { TileElement } from './components/tile';

import Curve from './components/curve';
import Line from './components/line';

import Point from './point';

export default class Track {
  constructor(
    private pos1: number,
    private pos2: number,
    private gague: string = 'standard'
  ) {
    if ((pos1 - pos2) > 3) {
      pos2 += 6;
    }
    if ((pos2 - pos1) > 3) {
      pos1 += 6;
    }
    this.pos1 = Math.min(pos1, pos2);
    this.pos2 = Math.max(pos1, pos2);
  }

  public elements(): List<ReactElement<TileElement>> {
    let result: Array<ReactElement<TileElement>>;
    if (this.isStraight()) {
      result = [
        <Line
          key={this.key}
          point1={this.trackPoints()[0]}
          point2={this.trackPoints()[1]}
        />
      ];
      if (this.gague === 'narrow') {
        result.push(
          <Line
          key={this.key + '-' + this.gague}
          point1={this.trackPoints()[0]}
          point2={this.trackPoints()[1]}
          stroke='white'
          strokeDasharray='10,10'
          strokeWidth={5}
          />
        );
      } else if (this.gague === 'dual') {
        result.push(
          <Line
          key={this.key + '-' + this.gague}
          point1={this.trackPoints()[0]}
          point2={this.trackPoints()[1]}
          stroke='white'
          strokeWidth={5}
          />
        );
      }
    } else {
      result = [
        <Curve
          key={this.key}
          point1={this.trackPoints()[0]}
          point2={this.trackPoints()[1]}
          radius={this.trackCurveRadius()}
        />
      ];
      if (this.gague === 'narrow') {
        result.push(
          <Curve
          key={this.key + '-' + this.gague}
          point1={this.trackPoints()[0]}
          point2={this.trackPoints()[1]}
          radius={this.trackCurveRadius()}
          stroke='white'
          strokeDasharray='10,10'
          strokeWidth={5}
          />
        );
      } else if (this.gague === 'dual') {
        result.push(
          <Curve
          key={this.key + '-' + this.gague}
          point1={this.trackPoints()[0]}
          point2={this.trackPoints()[1]}
          radius={this.trackCurveRadius()}
          stroke='white'
          strokeWidth={5}
          />
        );
      }
    }
    return List(result);
  }

  public midpoints(num: number): List<Point> {
    const results: Point[] = [];

    if (this.isStraight()) {
      const [point1, point2]: [Point, Point] = this.trackPoints();
      const xDiff: number = point1.x - point2.x;
      const yDiff: number = point1.y - point2.y;

      for (let i: number = 1; i <= num; i++) {
        results.push(new Point(
          point1.x - xDiff * (i / (num + 1)),
          point1.y - yDiff * (i / (num + 1)),
        ));
      }
    } else {
      const diff: number = Math.abs(
        this.trackRadians()[0] - this.trackRadians()[1]
      ) / (num + 1);
      let point: number = Math.min(...this.trackRadians());

      for (let i: number = 0; i < num; i++) {
        point += diff;
        results.push(new Point(
          this.trackCenter().x + Math.cos(point) * this.trackCurveRadius(),
          this.trackCenter().y - Math.sin(point) * this.trackCurveRadius()
        ));
      }
    }
    return List(results);
  }

  public isTightCurve(): boolean {
    return (this.pos2 - this.pos1) === 1 || (this.pos2 - this.pos1) === 5;
  }

  public isShallowCurve(): boolean {
    return (this.pos2 - this.pos1) === 2 || (this.pos2 - this.pos1) === 4;
  }

  public isStraight(): boolean {
    return (this.pos2 - this.pos1) === 3;
  }

  protected trackPoints(): [Point, Point] {
    const radius: number = this.trackCurveRadius();
    const trackCenter: Point = this.trackCenter();
    return this.trackRadians().map((r: number) =>
      new Point(
        trackCenter.x + Math.cos(r) * radius,
        trackCenter.y - Math.sin(r) * radius,
      )
    ) as [Point, Point];
  }

  private radianCenter(): number {
    return (this.pos1 + this.pos2) * Math.PI / 6;
  }

  private trackRadians(): number[] {
    let result: number[];
    if (this.isStraight()) {
      result = [this.pos1, this.pos2];
    } else if (this.isShallowCurve()) {
      result = [(this.pos1 + 3.5), (this.pos2 + 2.5)];
    } else if (this.isTightCurve()) {
      result = [(this.pos1 + 2.5), (this.pos2 + 3.5)];
    } else {
      throw new Error('Unknown Track Curve Type');
    }
    return result.map((n: number) => n * Math.PI / 3);
  }

  private centerRadius(): number {
    if (this.isShallowCurve()) {
      return Tile.WIDTH;
    } else if (this.isTightCurve()) {
      return Tile.HEIGHT / 2;
    } else if (this.isStraight()) {
      return 0;
    } else {
      throw new Error('Unknown Track Curve Type');
    }
  }

  private trackCurveRadius(): number {
    if (this.isShallowCurve()) {
      return Tile.SIDE_LENGTH * 3 / 2;
    } else if (this.isTightCurve()) {
      return Tile.SIDE_LENGTH / 2;
    } else if (this.isStraight()) {
      return Tile.WIDTH / 2;
    } else {
      throw new Error('Unknown Track Curve Type');
    }
  }

  private trackCenter(): Point {
    return new Point(
      Tile.CENTER.x + Math.cos(this.radianCenter()) * this.centerRadius(),
      Tile.CENTER.y - Math.sin(this.radianCenter()) * this.centerRadius()
    );
  }

  private get key(): string {
    return `${this.pos1}-${this.pos2}`;
  }
}
