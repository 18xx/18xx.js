import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';
import { createStore } from 'redux';

import GameInterface from '../../src/components/game_interface';
import MapBoard, { MapBoardProps } from '../../src/components/map_board';
import MapHex from '../../src/components/map_hex';

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

const gameInterface: GameInterface = new GameInterface({
  gameName: '18xx',
  mapDef,
  store: createStore(jest.fn()),
});

describe('MapBoard', () => {
  describe('#render()', () => {
    const hexes: List<ReactElement<MapHex>> = List([
      <MapHex mapDef={mapDef} row='a' column={1} key='a1' />,
      <MapHex mapDef={mapDef} row='a' column={3} key='a3' />,
    ]);
    const defaultProps: MapBoardProps = {
      gameInterface,
      hexes,
      invertHexes: false,
      orientation: 'east-west',
    };

    it('returns an svg representation of the map board', () => {
      const subject: any = renderer.create(
        <MapBoard {...defaultProps} />
      );
      expect(subject).toMatchSnapshot();
    });

    describe('with inverted hexes', () => {
      it('returns an svg representation of the map board', () => {
        const subject: any = renderer.create(
          <MapBoard {...defaultProps} invertHexes={true} />
        );
        expect(subject).toMatchSnapshot();
      });
    });

    describe('when a north-south board', () => {
      it('returns an svg representation of the map board', () => {
        const subject: any = renderer.create(
          <MapBoard {...defaultProps} orientation={'north-south'} />
        );
        expect(subject).toMatchSnapshot();
      });
    });
  });
});
