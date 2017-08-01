import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import Hexagon from '../hexagon';
import Point from '../point';

export interface TileNumberProps {
  hexagon: Hexagon;
  num: string;
  orientation?: number;
  point?: Point;
}

class TileNumber extends React.Component<TileNumberProps, undefined> {
  public render(): ReactElement<TileNumber> {
    return (
      <text
        x={this.point.x}
        y={this.point.y}
        textAnchor={this.textAnchor}
        fill='black'
        fontSize={Tile.SIDE_LENGTH / 8}
      >{this.text}</text>
    );
  }

  private get point(): Point {
    let result: Point = this.props.point;
    if (!result) {
      if (this.hexagon.orientation === 'north-south') {
        result = new Point(
          this.hexagon.hexRight,
          this.hexagon.height - 2
        );
      } else {
        result = new Point(
          this.hexagon.width - 1,
          (this.hexagon.height * 3 / 4) - 2
        );
      }
    }
    return result;
  }

  private get text(): string {
    let result: string = this.props.num;
    if (typeof this.props.orientation !== 'undefined') {
      result += `.${this.props.orientation}`;
    }
    return result;
  }

  private get textAnchor(): string {
    let result: string = 'start';
    if (this.point.isAtCenterX()) {
      result = 'middle';
    } else if (this.point.x > Tile.CENTER.x) {
      result =  'end';
    }
    return result;
  }

  private get hexagon(): Hexagon {
    return this.props.hexagon;
  }
}

export default TileNumber;
