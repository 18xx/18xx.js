import { List, Map } from 'immutable';

import TileDefinition, { TileDefinitionInput } from '../src/tile_definition';
import TileSet, { TileSetDetails } from '../src/tile_set';

describe('TileSet', () => {
  const allTiles: List<TileDefinitionInput> = List([
    {
      color: 'yellow',
      num: '7',
      track: [
        [0, 1]
      ]
    },
    {
      color: 'yellow',
      num: '8',
      track: [
        [0, 2]
      ]
    },
    {
      color: 'yellow',
      num: '9',
      track: [
        [0, 3]
      ]
    }
  ]);

  describe('#all', () => {
    it('returns a tile definition object for each tile in the manifest', () => {
      const tileManifest: Map<string, TileSetDetails> = Map({
        7: {},
        8: {},
      });
      const tileSet: TileSet = new TileSet(
        allTiles,
        'east-west',
        tileManifest
      );
      expect(tileSet.all.size).toEqual(2);
      expect(
        tileSet.all.every(tile => tile instanceof TileDefinition)
      ).toEqual(true);
    });
  });
});
