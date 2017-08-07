import { List } from 'immutable';

import { TileDefinitionInput } from '../../src/tile_definition';

export const allTiles: List<TileDefinitionInput> = List([
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
