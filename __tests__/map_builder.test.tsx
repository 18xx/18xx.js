import { List, Map } from 'immutable';
import { ReactElement } from 'react';

import Company from '../src/company';
import MapBuilder from '../src/map_builder';
import TileSet from '../src/tile_set';

import Game from '../src/components/game';
import Tile from '../src/components/tile';

const json: any = {
  companies: {
    'B&O': {
      name: 'Baltimore and Ohio Railroad',
      primaryColor: '#070A3F',
      secondaryColor: 'white',
      shorthand: 'B&O',
      textColor: 'black',
    }
  },
  costLocation: {
    b4: { x: 5, y: 35 }
  },
  dynamicValues: {
    a1: {
      values: {
        // FIXME: New Value System
        brown: 50,
        gray: 60,
        green: 30,
        yellow: 20,
      }
    }
  },
  hexes: {
    a: [1, 3],
    b: [2, 4, 6, 8]
  },
  names: {
    a1: 'One Town',
    a3: 'Threesville'
  },
  offBoards: {
    a1: {
      exits: [0, 5]
    }
  },
  preplacedTile: {
    b8: {
      color: 'gray',
      label: 'Preplaced',
      spots: 1,
      trackToCenter: [3],
      type: 'City'
    }
  },
  tileCostTypes: {
    mountain: {
      amount: 120,
      color: '#f86',
      shape: 'triangle'
    },
    river: {
      amount: 40,
      color: '#aaf',
      shape: 'square'
    }
  },
  tileCosts: {
    b2: 'river',
    b4: 'mountain'
  },
  tileManifest: {
  },
};

const game: Game = new Game({
  gameName: '18xx',
  mapDef: json,
});

describe('MapBuilder', () => {
  describe('#build()', () => {
    it('returns an svg of the map', () => {
      const tileSet: TileSet = new TileSet(List([]), json, Map());
      const builder: MapBuilder = new MapBuilder(game, json, tileSet);
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
