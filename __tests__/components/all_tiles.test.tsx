import { List } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { TileDefinitionInput } from '../../src/tile_definition';

import AllTiles from '../../src/components/all_tiles';

import { mapDefinition } from '../support/map_definition';

describe('AllTiles', () => {
  const tiles: List<TileDefinitionInput> = List([
    {
      color: 'yellow',
      num: '1',
      track: [
        [0, 2],
        [3, 5]
      ],
      // FIXME: Typescript bug
      // https://github.com/Microsoft/TypeScript/issues/16457
      type: 'Town' as 'Town',
      value: 10
    },
    {
      color: 'yellow',
      num: '2',
      track: [
        [0, 3],
        [1, 2]
      ],
      type: 'Town' as 'Town',
      value: 10
    },
  ]);

  describe('#render', () => {
    const subject: any = <AllTiles mapDef={mapDefinition} tiles={tiles} />;

    it('matches the snapshot', () => {
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
