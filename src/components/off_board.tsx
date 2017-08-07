import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import Tile from './tile';

import Hexagon from '../hexagon';

const EXIT_BASE: number = 5;
const EXIT_HEIGHT: number = 20;

export interface OffBoardProps {
  readonly exits: List<number>;
  readonly hexagon: Hexagon;
}

class OffBoard extends React.Component<OffBoardProps, {}>
implements MapHexElement {

  public render(): ReactElement<OffBoard> {
    const results: Array<ReactElement<any>> = [];

    const ePoints: List<string> = List([
      `${this.props.hexagon.width},${this.props.hexagon.center.y - EXIT_BASE}`,
      `${this.props.hexagon.width},${this.props.hexagon.center.y + EXIT_BASE}`,
      `${this.props.hexagon.width - EXIT_HEIGHT},${this.props.hexagon.center.y}`
    ]);
    const wPoints: List<string> = List([
      `${0},${this.props.hexagon.center.y - EXIT_BASE}`,
      `${0},${this.props.hexagon.center.y + EXIT_BASE}`,
      `${EXIT_HEIGHT},${this.props.hexagon.center.y}`
    ]);

    if (this.props.exits.indexOf(0) >= 0) {
      results.push(
        <polygon key={0} points={ePoints.join(' ')} fill='black' />
      );
    }

    if (this.props.exits.indexOf(1) >= 0) {
      results.push(
        this.offBoardExit(
          1,
          this.props.hexagon.width * 0.75,
          this.props.hexagon.height * 0.125,
          -1,
          1
        )
      );
    }

    if (this.props.exits.indexOf(2) >= 0) {
      results.push(
        this.offBoardExit(
          2,
          this.props.hexagon.width * 0.25,
          this.props.hexagon.height * 0.125,
          1,
          1
        )
      );
    }

    if (this.props.exits.indexOf(3) >= 0) {
      results.push(
        <polygon key={3} points={wPoints.join(' ')} fill='black' />
      );
    }

    if (this.props.exits.indexOf(4) >= 0) {
      results.push(
        this.offBoardExit(
          4,
          this.props.hexagon.width * 0.25,
          this.props.hexagon.height * 0.875,
          1,
          -1
        )
      );
    }

    if (this.props.exits.indexOf(5) >= 0) {
      results.push(
        this.offBoardExit(
          5,
          this.props.hexagon.width * 0.75,
          this.props.hexagon.height * 0.875,
          -1,
          -1
        )
      );
    }

    return <g key='off-boards'>{results}</g>;
  }

  private offBoardExit(
    key: number,
    xStart: number,
    yStart: number,
    xDir: number,
    yDir: number
  ): ReactElement<any> {
    const points: string = [
      [
        (xStart + EXIT_BASE * xDir * Math.sin(Math.PI / 3)),
        (yStart - EXIT_BASE * yDir * Math.cos(Math.PI / 3)),
      ],
      [
        (xStart - EXIT_BASE * xDir * Math.sin(Math.PI / 3)),
        (yStart + EXIT_BASE * yDir * Math.cos(Math.PI / 3)),
      ],
      [
        (xStart + EXIT_HEIGHT * xDir * Math.cos(Math.PI / 3)),
        (yStart + EXIT_HEIGHT * yDir * Math.sin(Math.PI / 3)),
      ],
    ].map(pair => pair.join()).join(' ');

    return (
      <polygon key={key} points={points} fill='black' />
    );
  }
}

export default OffBoard;
