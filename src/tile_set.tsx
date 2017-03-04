import { List, Map } from 'immutable';
import { ReactElement } from 'react';

import Tile from './components/tile';

import TileDefinition, { TileDefinitionInput } from './tile_definition';

export interface TileSetDetails {
  readonly count?: number;
  readonly promotions?: string[];
}

export default class TileSet {
  constructor(
    private allTiles: List<TileDefinitionInput>,
    private orientation: string,
    private tileManifest: Map<string, TileSetDetails>,
  ) {
  }

  public get all(): List<TileDefinition> {
    const fn: (def: TileDefinitionInput) => TileDefinition = def => (
      new TileDefinition(def, this.orientation)
    );
    return this.allTiles.map(fn).filter(
      def => this.tileManifest.keySeq().includes(def.num.toString())
    ).toList();
  }

  public findDefinition(num: string): TileDefinition {
    return this.all.find(def => def.num.toString() === num);
  }

  public totalTiles(num: string): number {
    return this.tileManifest.get(num.toString()).count;
  }
}
