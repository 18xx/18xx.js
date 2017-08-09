import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Tile, { TileElement } from './components/tile';

import { MapDefinition } from './map_builder';
import TileDefinition from './tile_definition';
import TileFactory from './tile_factory';
import Track from './track';
import TrackSpecial from './track_special';
import TrackToCenter from './track_to_center';

class TileBuilder {
  constructor(
    private mapDef: MapDefinition,
    private onRightClickCity?: (hex: string, index: number) => void,
    private onRightClickToken?: (
      hex: string,
      index: number
    ) => void,
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
      this.mapDef,
      this.onRightClickCity,
      this.onRightClickToken,
      new TileDefinition(this.mapDef, def),
      i,
      this.hex,
    );

    let track: List<ReactElement<TileElement>> | undefined;
    if (factory.track) {
      track = factory.track.map(
        (t: Track) => t.elements()
      ).flatten(true).toList();
    }

    let trackSpecial: List<ReactElement<TileElement>> | undefined;
    if (factory.trackSpecial) {
      trackSpecial = factory.trackSpecial.map(
        (t: TrackSpecial) => t.element()
      ).toList();
    }

    let trackToCenter: List<ReactElement<TileElement>>| undefined;
    if (factory.trackToCenter) {
      trackToCenter = factory.trackToCenter.map(
        (t: TrackToCenter) => t.element()
      ).toList();
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

    let key: string = 'pp';
    if (def.num) {
      key = def.num + '.' + i;
    }

    return (
      <Tile
      orientation={this.mapDef.orientation}
      key={key}
      color={color}
      elements={elements} />
    );
  }
}

export default TileBuilder;
