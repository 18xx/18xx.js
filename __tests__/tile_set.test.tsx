import { Map } from 'immutable';

import * as mapDef from '../config/maps/1830.json';

import { allTiles } from './support/all_tiles';

import TileDefinition from '../src/tile_definition';
import TileSet, { TileSetDetails } from '../src/tile_set';

describe('TileSet', () => {
  describe('#all', () => {
    it('returns a tile definition object for each tile in the manifest', () => {
      const tileManifest: Map<string, TileSetDetails> = Map({
        7: {},
        8: {},
      });
      const tileSet: TileSet = new TileSet(
        allTiles,
        mapDef as any,
        tileManifest
      );
      expect(tileSet.all.size).toEqual(2);
      expect(
        tileSet.all.every(tile => tile instanceof TileDefinition)
      ).toEqual(true);
    });
  });
});
