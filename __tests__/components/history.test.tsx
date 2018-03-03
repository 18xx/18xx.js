import { List, Map } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { allTiles } from '../support/all_tiles';
import { mapDefinition } from '../support/map_definition';

import TileSet, { TileSetDetails } from '../../src/tile_set';

import History, {
  HistoryEntry,
  HistoryProps,
} from '../../src/components/history';

describe('History', () => {
  const tileManifest: Map<string, TileSetDetails> = Map({
    1: { count: 0 },
    7: { count: 1 },
    8: { count: 10 },
    9: {},
  });
  const tileSet: TileSet = new TileSet(allTiles, mapDefinition, tileManifest);

  const placeTile: HistoryEntry = {
    action: 'PLACE_TILE',
    hash: 'tile',
    hex: 'b2',
    id: '7.1',
  };

  const invalidPlaceTile: HistoryEntry = {
    action: 'PLACE_TILE',
    hash: 'tile',
    hex: 'b2',
    id: '58.1',
  };

  const placeToken: HistoryEntry = {
    action: 'PLACE_TOKEN',
    hash: 'token',
    hex: 'a1',
    id: 'B&O',
  };

  const removeToken: HistoryEntry = {
    action: 'REMOVE_TOKEN',
    hash: 'rm-token',
    hex: 'a1',
    id: 'B&O',
  };

  const unknownEntry: HistoryEntry = {
    action: 'UNKNOWN',
    hash: 'unknown',
    hex: 'b1',
    id: '',
  };

  const props: HistoryProps = {
    entries: List([placeTile, placeToken, removeToken, unknownEntry]),
    mapDef: mapDefinition,
    tileSet
  };

  describe('#render', () => {
    it('renders the history', () => {
      const subject: React.ReactElement<History> = (
        <History {...props} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('with an unknown tile', () => {
      const badProps: HistoryProps = {
        entries: List([invalidPlaceTile]),
        mapDef: mapDefinition,
        tileSet
      };

      it('throw an error', () => {
        const subject: React.ReactElement<History> = (
          <History {...badProps} />
        );

        expect(() => renderer.create(subject)).toThrowError();
      });
    });
  });
});
