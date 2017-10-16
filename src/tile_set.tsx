import { List, Map } from 'immutable';

import { MapDefinition } from './map_builder';
import TileDefinition, { TileDefinitionInput } from './tile_definition';

export interface TileSetDetails {
  readonly count?: number;
  readonly promotions?: string[];
}

class TileSet {
  constructor(
    private allTiles: List<TileDefinitionInput>,
    private mapDef: MapDefinition,
    private tileManifest: Map<string, TileSetDetails>,
  ) {
  }

  public get all(): List<TileDefinition> {
    const fn: (def: TileDefinitionInput) => TileDefinition = def => (
      new TileDefinition(this.mapDef, def)
    );
    return this.allTiles.map(fn).filter(
      (def: TileDefinition) =>
        this.tileManifest.keySeq().includes(def.num.toString())
    ).toList();
  }

  public findDefinition(num: string): TileDefinition | undefined {
    return this.all.find((def: TileDefinition) => def.num.toString() === num);
  }

  public totalTiles(num: string): number {
    const inManifest: TileSetDetails | undefined = this.tileManifest.get(
      num.toString()
    );

    if (inManifest && inManifest.count) {
      return inManifest.count;
    } else {
      return Infinity;
    }
  }
}

export default TileSet;
