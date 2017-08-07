import { List, Map } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { allTiles } from '../support/all_tiles';
import { mapDefinition } from '../support/map_definition';

import TileSet, { TileSetDetails } from '../../src/tile_set';

import AvailableTiles, {
  AvailableTilesProps
} from '../../src/components/available_tiles';
import Tile from '../../src/components/tile';

describe('AvailableTiles', () => {
  const tileManifest: Map<string, TileSetDetails> = Map({
    1: { count: 0 },
    7: { count: 1 },
    8: { count: 10 },
    9: {},
  });
  const tileSet: TileSet = new TileSet(allTiles, mapDefinition, tileManifest);

  const defaultProps: AvailableTilesProps = {
    onClick: jest.fn(),
    show: true,
    tileFilter: List(['7', '8']),
    tileSet,
    tiles: Map({a1: '7'}),
  };

  it('renders correctly', () => {
    const subject: React.ReactElement<AvailableTiles> = (
      <AvailableTiles {...defaultProps} />
    );
    expect(renderer.create(subject)).toMatchSnapshot();
  });
});
