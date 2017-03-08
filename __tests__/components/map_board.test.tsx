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
  describe('#numColumns', () => {
    describe('when the map board includes one column', () => {
      it('returns 1', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex mapDef={mapDef} row='a' column={1} />,
            <MapHex mapDef={mapDef} row='c' column={1} />,
          ]),
          orientation: mapDef.orientation,
        });
        expect(mapBoard.numColumns).toEqual(1);
      });
    });
    describe('when the map board includes three columns', () => {
      it('returns 3', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex mapDef={mapDef} row='a' column={1} />,
            <MapHex mapDef={mapDef} row='a' column={3} />,
            <MapHex mapDef={mapDef} row='b' column={2} />,
            <MapHex mapDef={mapDef} row='c' column={1} />,
          ]),
          orientation: mapDef.orientation,
        });
        expect(mapBoard.numColumns).toEqual(3);
      });
    });
  });

  describe('#numRows', () => {
    describe('when the map board includes one row', () => {
      it('returns 1', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex mapDef={mapDef} row='a' column={1} />,
            <MapHex mapDef={mapDef} row='a' column={3} />,
          ]),
          orientation: mapDef.orientation,
        });
        expect(mapBoard.numRows).toEqual(1);
      });
    });
    describe('when the map board includes three rows', () => {
      it('returns 3', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex mapDef={mapDef} row='a' column={1} />,
            <MapHex mapDef={mapDef} row='a' column={3} />,
            <MapHex mapDef={mapDef} row='b' column={2} />,
            <MapHex mapDef={mapDef} row='c' column={1} />,
          ]),
          orientation: mapDef.orientation,
        });
        expect(mapBoard.numRows).toEqual(3);
      });
    });
  });

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
