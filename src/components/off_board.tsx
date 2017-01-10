import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';
import Tile from './tile';

const EXIT_BASE: number = 5;
const EXIT_HEIGHT: number = 20;

export interface OffBoardProps {
  readonly exits: List<number>;
}

export default class OffBoard
extends React.Component<OffBoardProps, undefined>
implements MapHexElement {

  public render(): ReactElement<OffBoard> {
    const results: Array<ReactElement<any>> = [];

    const ePoints: List<string> = List([
      `${Tile.WIDTH},${Tile.CENTER.y - EXIT_BASE}`,
      `${Tile.WIDTH},${Tile.CENTER.y + EXIT_BASE}`,
      `${Tile.WIDTH - EXIT_HEIGHT},${Tile.CENTER.y}`
    ]);
    const wPoints: List<string> = List([
      `${0},${Tile.CENTER.y - EXIT_BASE}`,
      `${0},${Tile.CENTER.y + EXIT_BASE}`,
      `${EXIT_HEIGHT},${Tile.CENTER.y}`
    ]);

    if (this.props.exits.indexOf(0) >= 0) {
      results.push(
        <polygon key={0} points={ePoints.join(' ')} fill='black' />
      );
    }

    if (this.props.exits.indexOf(1) >= 0) {
      results.push(
        this.offBoardExit(1, Tile.WIDTH * 0.75, -1, Tile.HEIGHT * 0.125, 1)
      );
    }

    if (this.props.exits.indexOf(2) >= 0) {
      results.push(
        this.offBoardExit(2, Tile.WIDTH * 0.25, 1, Tile.HEIGHT * 0.125, 1)
      );
    }

    if (this.props.exits.indexOf(3) >= 0) {
      results.push(
        <polygon key={3} points={wPoints.join(' ')} fill='black' />
      );
    }

    if (this.props.exits.indexOf(4) >= 0) {
      results.push(
        this.offBoardExit(4, Tile.WIDTH * 0.25, 1, Tile.HEIGHT * 0.875, -1)
      );
    }

    if (this.props.exits.indexOf(5) >= 0) {
      results.push(
        this.offBoardExit(5, Tile.WIDTH * 0.75, -1, Tile.HEIGHT * 0.875, -1)
      );
    }

    return <g key='off-boards'>{results}</g>;
  }

  private offBoardExit(
    key: number,
    xStart: number,
    xDir: number,
    yStart: number,
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
