import { mount } from 'enzyme';
import { List, Map } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { allTiles } from '../support/all_tiles';
import { mapDefinition } from '../support/map_definition';

import TileSet, { TileSetDetails } from '../../src/tile_set';

import AvailableTiles, {
  AvailableTilesProps
} from '../../src/components/available_tiles';

describe('AvailableTiles', () => {
  const tileManifest: Map<string, TileSetDetails> = Map({
    1: { count: 0 },
    7: { count: 1 },
    8: { count: 10 },
    9: {},
  });
  const tileSet: TileSet = new TileSet(allTiles, mapDefinition, tileManifest);
  const onClick: any = jest.fn();

  const defaultProps: AvailableTilesProps = {
    onClick,
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

  describe('when clicking a tile', () => {
    const subject: React.ReactElement<AvailableTiles> = (
      <AvailableTiles {...defaultProps} />
    );

    it('calls onClick with the tile number', () => {
      mount(subject).find('.available-tile').last().simulate('click');
      expect(onClick.mock.calls.length).toEqual(1) ;
      expect(onClick.mock.calls[0]).toEqual(['8.5']);
    });
  });
});
