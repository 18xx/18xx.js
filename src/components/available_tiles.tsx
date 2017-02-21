import { List, Map } from 'immutable';
import * as _ from 'lodash';
import * as React from 'react';
import { MouseEventHandler, ReactElement } from 'react';

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
    const total: number = this.props.tileSet.totalTiles(num);

    let onClick: MouseEventHandler<HTMLElement> = () =>
      this.props.onClick(tile);
    let divClass: string = 'available-tile';
    let availableElement: ReactElement<HTMLElement>;

    if (total) {
      const available: number = total - this.usedTiles(num);

      if (available <= 0) {
        onClick = null;
        divClass += ' unavailable';
      }

      availableElement = (
        <div className='amount-available'>
          {available} / {total}
        </div>
      );
    }

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

  private usedTiles(num: string): any {
    return _.countBy(
      this.props.tiles.valueSeq().map((s: string) => s.split('.')[0]).toJS()
    )[num] || 0;
  }
}
