import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Game from '../../src/components/game';
import MapBoard from '../../src/components/map_board';
import MapHex, { MapHexProps } from '../../src/components/map_hex';

import { MapDefinition } from '../../src/map_builder';

const mapDef: MapDefinition = {
  companies: {},
  hexes: {
    a: [],
    b: [],
    c: [],
  },
  orientation: 'east-west',
  tileManifest: {},
};

const game: Game = new Game({
  gameName: '18xx',
  mapDef,
});

describe('MapBoard', () => {
  describe('#render()', () => {
    it('returns an svg representation of the map board', () => {
      const hexes: List<ReactElement<MapHex>> = List([
        <MapHex mapDef={mapDef} row='a' column={1} key='a1' />,
        <MapHex mapDef={mapDef} row='a' column={3} key='a3' />,
      ]);
      const subject: any = renderer.create(
        <MapBoard game={game} hexes={hexes} orientation={'east-west'} />
      );
      expect(subject).toMatchSnapshot();
    });
  });
});
