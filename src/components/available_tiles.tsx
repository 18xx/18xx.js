import { List, Map } from 'immutable';
import * as _ from 'lodash';
import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';

import TileDefinition from '../tile_definition';
import TileSet from '../tile_set';

export interface AvailableTilesProps {
  readonly tileFilter?: List<string>;
  readonly onClick: any;
  readonly show: boolean;
  readonly tiles: Map<string, string>;
  readonly tileSet: TileSet;
}

export default class AvailableTiles
  extends React.Component<AvailableTilesProps, undefined> {

  public static defaultProps: any;

  get tiles(): List<ReactElement<any>> {
    return this.props.tileSet.all.filter(tileDef =>
      this.props.tileFilter.includes(tileDef.num)
    ).map(
      tileDef => tileDef.allRotations.map(
        (tile: ReactElement<Tile>, index: number) =>
          this.drawTile(tile, tileDef.num, index)
      )
    ).flatten().toList();
  }

  public render(): ReactElement<AvailableTiles> {
    return <div id='tileMenu'>{this.tiles}</div>;
  }

  private drawTile(
    tile: ReactElement<Tile>,
    num: string,
    index: number,
  ): ReactElement<any> {
    const available: number = this.props.tileSet.totalTiles(num);
    // FIXME: Move onClick to tile
    return <div
      key={`${num}:${index}`}
      onClick={ () => this.props.onClick(tile) }
      className='available-tile'
      >
        {tile}
        <div className='amount-available'>
          {available - this.usedTiles(num)} / {available}
        </div>
      </div>;
  }

  private usedTiles(num: string): any {
    return _.countBy(
      this.props.tiles.valueSeq().map((s: string) => s.split('.')[0]).toJS()
    )[num] || 0;
  }
}
