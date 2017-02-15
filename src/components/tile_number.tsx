import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import Point from '../point';

export interface TileNumberProps {
  num: string;
  orientation?: number;
  point?: Point;
}

export default class TileNumber
extends React.Component<TileNumberProps, undefined> {
  public static defaultProps: Partial<TileNumberProps> = {
    point: new Point(
      Tile.WIDTH - 1,
      (Tile.HEIGHT * 3 / 4) - 2
    ),
  };

  public text(): string {
    let result: string = this.props.num;
    if (typeof this.props.orientation !== 'undefined') {
      result += `.${this.props.orientation}`;
    }
    return result;
  }

  public render(): ReactElement<TileNumber> {
    return (
      <text
        x={this.point.x}
        y={this.point.y}
        textAnchor={this.textAnchor}
        fill='black'
        fontSize={Tile.SIDE_LENGTH / 8}
      >{this.text()}</text>
    );
  }

  private get point(): Point {
    return this.props.point;
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
}
