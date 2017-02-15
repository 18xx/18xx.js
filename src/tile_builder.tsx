import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Tile, { TileElement } from './components/tile';

import TileDefinition from './tile_definition';
import TileFactory from './tile_factory';

export default class TileBuilder {
  constructor(
    private onRightClickCity?: Function,
    private onRightClickToken?: Function,
    private hex?: string,
    private tokenState?: List<string>,
    private homeTokens?: List<string>,
  ) {
  }

  public buildTile(
    def: TileDefinition,
    i: number = 0): ReactElement<Tile> {

    const color: string = def.color;
    const factory: TileFactory = new TileFactory(
      this.onRightClickCity,
      this.onRightClickToken,
      new TileDefinition(def),
      i,
      this.hex,
    );

    let track: List<ReactElement<TileElement>>;
    if (factory.track) {
      track = factory.track.map(t => t.element()).toList();
    }

    let trackSpecial: List<ReactElement<TileElement>>;
    if (factory.trackSpecial) {
      trackSpecial = factory.trackSpecial.map(t => t.element()).toList();
    }

    let trackToCenter: List<ReactElement<TileElement>>;
    if (factory.trackToCenter) {
      trackToCenter = factory.trackToCenter.map(t => t.element()).toList();
    }

    const elements: List<ReactElement<TileElement>> = List([
      track,
      trackSpecial,
      trackToCenter,
      factory.city(this.tokenState, this.homeTokens),
      factory.dynamicValues,
      factory.value,
      factory.label,
      factory.tileNumber,
      factory.tileCost,
      factory.privateReservation,
    ].filter(el => el)).flatten().toList();

    let key: string;
    if (def.num) {
      key = def.num + '.' + i;
    } else {
      key = 'pp';
    }

    return (
      <Tile key={key} color={color} elements={elements} />
    );
  }
}
