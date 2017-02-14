import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import Point from '../point';

const FONT_SIZE: number = 16;
const OFFSET: number = 2;

export interface LabelProps {
  point?: Point;
  labelStr: string;
}

export default class Label extends React.Component<LabelProps, undefined> {
  public static defaultProps: LabelProps = {
    point: new Point(
      Math.round(Tile.WIDTH - OFFSET),
      Tile.HEIGHT / 4 + FONT_SIZE - OFFSET
    ),
  } as LabelProps;

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
    return this.props.point;
  }

  private textAnchor(): string {
    let result: string = 'start';
    if (this.point.x === Tile.CENTER.x) {
      result = 'middle';
    } else if (this.point.x > Tile.CENTER.x) {
      result =  'end';
    }
    return result;
  }
}
