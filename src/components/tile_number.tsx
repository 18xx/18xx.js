import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

export interface TileNumberProps {
  num: string;
  orientation?: number;
}

export default class TileNumber
extends React.Component<TileNumberProps, undefined> {
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
        x={Tile.WIDTH - 1}
        y={(Tile.HEIGHT * 3 / 4) - 2}
        textAnchor='end'
        fill='black'
        fontSize={Tile.SIDE_LENGTH / 8}
      >{this.text()}</text>
    );
  }
}
