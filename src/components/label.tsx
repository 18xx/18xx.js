import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import Hexagon from '../hexagon';
import Point from '../point';

const FONT_SIZE: number = 16;
const OFFSET: number = 2;

export interface LabelProps {
  hexagon: Hexagon;
  point?: Point;
  labelStr: string;
}

export default class Label extends React.Component<LabelProps, undefined> {
  public render(): ReactElement<Label> {
    return (
      <text
        x={this.point.x}
        y={this.point.y}
        textAnchor={this.textAnchor()}
        fill='black'
        fontSize={FONT_SIZE}
        fontWeight='bold'>
        {this.props.labelStr}
      </text>
    );
  }

  private get point(): Point {
    let result: Point = this.props.point;
    if (!result) {
      if (this.hexagon.offset === 0.5) {
        result = new Point(
          this.hexagon.hexRight,
          FONT_SIZE - OFFSET,
        );
      } else {
        result = new Point(
          this.hexagon.width - OFFSET,
          this.hexagon.height / 4 + FONT_SIZE - OFFSET
        );
      }
    }
    return result;

  }

  private get hexagon(): Hexagon {
    return this.props.hexagon;
  }

  private textAnchor(): string {
    let result: string = 'start';
    if (this.point.isAtCenterX()) {
      result = 'middle';
    } else if (this.point.x > Tile.CENTER.x) {
      result =  'end';
    }
    return result;
  }
}
