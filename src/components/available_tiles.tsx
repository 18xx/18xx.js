import { List, Map } from 'immutable';
import * as _ from 'lodash';
import * as React from 'react';
import { MouseEventHandler, ReactElement } from 'react';

import Tile from './tile';

import TileDefinition from '../tile_definition';
import TileSet from '../tile_set';

export interface AvailableTilesInitProps {
  readonly tileFilter: List<string>;
  readonly tiles: Map<string, string>;
  readonly tileSet: TileSet;
}

export interface AvailableTilesMappedProps {
  readonly onClick: (tile: string) => void;
}

export type AvailableTilesProps =
  AvailableTilesInitProps & AvailableTilesMappedProps;

class AvailableTiles extends React.Component<AvailableTilesProps, {}> {
  public static defaultProps: any;

  public render(): ReactElement<AvailableTiles> {
    return <div id='tileMenu'>{this.tiles}</div>;
  }

  private drawTile(
    tile: ReactElement<Tile>,
    num: string,
    index: number,
  ): ReactElement<any> {
    const total: number = this.props.tileSet.totalTiles(num);

    let onClick: MouseEventHandler<HTMLElement> | undefined = () => {
      if (tile.key) {
        this.props.onClick(tile.key.toString());
      }
    };
    let divClass: string = 'available-tile';
    let availableElement: ReactElement<HTMLElement> | undefined;

    const available: number = total - this.usedTiles(num);

    if (available <= 0) {
      onClick = undefined;
      divClass += ' unavailable';
    }

    availableElement = (
      <div className='amount-available'>
        {available} / {total}
      </div>
    );

    // FIXME: Move onClick to tile
    return <div
      key={`${num}:${index}`}
      onClick={onClick}
      className={divClass}
      >
        {tile}
        {availableElement}
      </div>;
  }

  private get tiles(): List<ReactElement<any>> {
    return this.props.tileSet.all.filter((tileDef: TileDefinition) =>
      this.props.tileFilter.includes(tileDef.num)
    ).map(
      (tileDef: TileDefinition) => tileDef.allRotations.map(
        (tile: ReactElement<Tile>, index: number) =>
          this.drawTile(tile, tileDef.num, index)
      )
    ).flatten().toList();
  }

  private usedTiles(num: string): any {
    return _.countBy(
      this.props.tiles.valueSeq().map((s: string) => s.split('.')[0]).toJS()
    )[num] || 0;
  }
}

export default AvailableTiles;
