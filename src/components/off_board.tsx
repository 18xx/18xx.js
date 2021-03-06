import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';

import Hexagon from '../hexagon';
import Point from '../point';

export interface OffBoardProps {
  readonly exits: List<number>;
  readonly hexagon: Hexagon;
}

class OffBoard extends React.Component<OffBoardProps, {}>
implements MapHexElement {

  public render(): ReactElement<OffBoard> {
    const results: List<ReactElement<SVGPolygonElement>> =
      this.props.exits.map<ReactElement<SVGPolygonElement>>((n: number) => (
        <polygon key={n} points={this.exit(n).join(' ')} fill='black' />
      )) as List<ReactElement<SVGPolygonElement>>;

    return <g key='off-boards'>{results}</g>;
  }

  private exit(pos: number): List<Point> {
    const p1: Point | undefined = this.props.hexagon.hexPoints().get(pos);
    const p2: Point | undefined =
      this.props.hexagon.hexPoints().get((pos + 5) % 6)!;

    if (!p1 || !p2) {
      throw new Error('Could not find hex point for ' + pos);
    }

    const midpoint: Point = Point.midpoint(p1, p2);

    return List([
      Point.midpoint(
        midpoint,
        Point.midpoint(midpoint, Point.midpoint(midpoint, p1))
      ),
      Point.midpoint(
        midpoint,
        Point.midpoint(midpoint, Point.midpoint(midpoint, p2))
      ),
      Point.midpoint(
        midpoint,
        Point.midpoint(midpoint, this.props.hexagon.center)
      ),
    ]);
  }
}

export default OffBoard;
