import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import Tile, { TileElement } from './tile';

import Point from '../point';

const STROKE_COLOR: string = '#333';
const WIDTH: number = 20;
const HEIGHT: number = 20;

interface TileCostProps {
  readonly amount: number;
  readonly color: string;
  readonly location?: Point;
  readonly shape?: string; // FIXME: enum
}

export default class TileCost
extends React.Component<TileCostProps, undefined>
implements MapHexElement, TileElement {

  public static defaultProps: any;

  public render(): ReactElement<TileCost> {
    let result: ReactElement<TileCost>;
    const textY: number = this.location.y + HEIGHT * 0.8;

    if (this.props.shape === 'triangle') {
      result = (
        <g key='tile-cost'>
          {this.triangle}
          {this.text(textY + 5)}
        </g>
      );
    } else {
      result = (
        <g key='tile-cost'>
          {this.square}
          {this.text(textY)}
        </g>
      );
    }

    return result;
  }

  private get location(): Point {
    return this.props.location;
  }

  private get square(): ReactElement<any> {
    return (
      <rect
        x={this.location.x}
        y={this.location.y}
        width={WIDTH}
        height={HEIGHT}
        fill={this.props.color}
        stroke={STROKE_COLOR} />
    );
  }

  private get triangle(): ReactElement<any> {
    const points: List<Point> = List([
      new Point(this.location.x + WIDTH / 2, this.location.y - 5),
      new Point(this.location.x + WIDTH * 1.5, this.location.y + 25),
      new Point(this.location.x - WIDTH / 2, this.location.y + 25),
    ]);

    return (
      <polygon
        points={points.map(p => p.toString()).join(' ')}
        fill={this.props.color}
        stroke={STROKE_COLOR} />
    );
  }

  private text(y: number): ReactElement<any> {
    return (
      <text
        key='cost-text'
        textAnchor='middle'
        x={this.location.x + (WIDTH / 2)}
        y={y}>
        {this.props.amount}
      </text>
    );
  }
}

TileCost.defaultProps = {
  location: new Point(Tile.CENTER.x - 10, 14),
  shape: 'square',
};
