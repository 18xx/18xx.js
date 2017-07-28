import { List, Set } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Game from './game';
import MapHex, { MapHexProps } from './map_hex';
import Tile from './tile';

export interface MapBoardProps {
  readonly addOnTop?: List<ReactElement<any>>;
  readonly game: Game;
  readonly hexes: List<ReactElement<MapHex>>;
  readonly orientation: string;
}

class MapBoard extends React.Component<MapBoardProps, undefined>  {

  get hexes(): List<ReactElement<MapHex>> {
    return this.props.hexes;
  }

  get height(): number {
    let result: number = (1.5 * this.numRows + 0.5) * Tile.SIDE_LENGTH;
    if (this.props.orientation === 'north-south') {
      result = (this.numRows + 1) * Tile.SIDE_LENGTH * Math.sqrt(3) * 0.5;
    }
    return result;
  }

  get width(): number {
    let result: number = (this.numColumns + 1) / 2 * Tile.WIDTH;
    if (this.props.orientation === 'north-south') {
      result = (this.numColumns + 0.5) * Tile.SIDE_LENGTH * 1.5;
    }
    return result;
  }

  get numColumns(): number {
    return Set(this.hexes.map(hex => hex.props.column)).size;
  }

  get numRows(): number {
    return Set(this.hexes.map(hex => hex.props.row)).size;
  }

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
}

export default MapBoard;
