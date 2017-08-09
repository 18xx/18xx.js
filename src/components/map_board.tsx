import { List, Set } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Game from './game';
import MapHex from './map_hex';
import Tile from './tile';

export interface MapBoardProps {
  readonly addOnTop?: List<ReactElement<any>>;
  readonly game: Game;
  readonly hexes: List<ReactElement<MapHex>>;
  readonly orientation: string;
}

class MapBoard extends React.Component<MapBoardProps, {}>  {
  public render(): ReactElement<MapBoard> {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height={this.height}
        width={this.width}
        id='mapBoard'>
        {this.hexes}
        {this.props.addOnTop}
      </svg>
    );
  }

  private get hexes(): List<ReactElement<MapHex>> {
    return this.props.hexes;
  }

  private get height(): number {
    let result: number = (1.5 * this.numRows + 0.5) * Tile.SIDE_LENGTH;
    if (this.props.orientation === 'north-south') {
      result = (this.numRows + 1) * Tile.SIDE_LENGTH * Math.sqrt(3) * 0.5;
    }
    return result;
  }

  private get width(): number {
    let result: number = (this.numColumns + 1) / 2 * Tile.WIDTH;
    if (this.props.orientation === 'north-south') {
      result = (this.numColumns + 0.5) * Tile.SIDE_LENGTH * 1.5;
    }
    return result;
  }

  private get numColumns(): number {
    return Set(this.hexes.map(
      (hex: ReactElement<MapHex>) => hex.props.column
    )).size;
  }

  private get numRows(): number {
    return Set(this.hexes.map(
      (hex: ReactElement<MapHex>) => hex.props.row
    )).size;
  }
}

export default MapBoard;
