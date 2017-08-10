import { List, Map } from 'immutable';
import { createStore } from 'redux';

import MapBuilder from '../src/map_builder';
import TileSet from '../src/tile_set';

import { mapDefinition } from './support/map_definition';

describe('MapBuilder', () => {
  describe('#build()', () => {
    it('returns an svg of the map', () => {
      const tileSet: TileSet = new TileSet(List([]), mapDefinition, Map());
      const builder: MapBuilder = new MapBuilder(
        {} as any,
        mapDefinition,
        tileSet
      );
      const tileState: Map<string, string> = (
        Map() as Map<string, string>
      );
      const tokenState: Map<string, List<string>> = (
        Map() as Map<string, List<string>>
      );
      const fn: any = () => builder.getHexes(tileState, tokenState);
      // TODO: This deserves a better expectation
      expect(fn).not.toThrow();
    });
  });
});
