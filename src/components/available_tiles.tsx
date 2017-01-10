import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import TileDefinition from '../tile_definition';

export interface AvailableTilesProps {
  readonly tileFilter?: List<string>;
  readonly onClick: any;
  readonly show: boolean;
  readonly tiles: List<TileDefinition>;
}

export default class AvailableTiles
  extends React.Component<AvailableTilesProps, undefined> {

  public static defaultProps: any;

  get tiles(): List<ReactElement<any>> {
    return this.props.tiles.filter(tileDef =>
      this.props.tileFilter.includes(tileDef.num)
    ).map(
      tileDef => tileDef.allRotations.map(
        (tile: ReactElement<Tile>, index: number) =>
          this.drawTile(tile, `${tileDef.num}:${index}`)
      )
    ).flatten().toList();
  }

  public render(): ReactElement<AvailableTiles> {
    return <div id='tileMenu'>{this.tiles}</div>;
  }

  private drawTile(tile: ReactElement<Tile>, key: string): ReactElement<any> {
    // FIXME: Move onClick to tile
    return <g
      key={key}
      onClick={ () => this.props.onClick(tile) } >
        {tile}
      </g>;
  }
}
