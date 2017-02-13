import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Game from '../../src/components/game';
import MapBoard from '../../src/components/map_board';
import MapHex, { MapHexProps } from '../../src/components/map_hex';

import { MapDefinition } from '../../src/map_builder';

const json: MapDefinition = {
  companies: {},
  hexes: {},
  tileManifest: {},
};

const game: Game = new Game({
  gameName: '18xx',
  mapDef: json,
});

describe('MapBoard', () => {
  describe('#numColumns', () => {
    describe('when the map board includes one column', () => {
      it('returns 1', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex row='a' column={1} />,
            <MapHex row='c' column={1} />,
          ]),
        });
        expect(mapBoard.numColumns).toEqual(1);
      });
    });
    describe('when the map board includes three columns', () => {
      it('returns 3', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex row='a' column={1} />,
            <MapHex row='a' column={3} />,
            <MapHex row='b' column={2} />,
            <MapHex row='c' column={1} />,
          ]),
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
            <MapHex row='a' column={1} />,
            <MapHex row='a' column={3} />,
          ]),
        });
        expect(mapBoard.numRows).toEqual(1);
      });
    });
    describe('when the map board includes three rows', () => {
      it('returns 3', () => {
        const mapBoard: MapBoard = new MapBoard({
          game,
          hexes: List([
            <MapHex row='a' column={1} />,
            <MapHex row='a' column={3} />,
            <MapHex row='b' column={2} />,
            <MapHex row='c' column={1} />,
          ]),
        });
        expect(mapBoard.numRows).toEqual(3);
      });
    });
  });

  describe('#render()', () => {
    it('returns an svg representation of the map board', () => {
      const hexes: List<ReactElement<MapHex>> = List([
        <MapHex row='a' column={1} key='a1' />,
        <MapHex row='a' column={3} key='a3' />,
      ]);
      const subject: any = renderer.create(
        <MapBoard game={game} hexes={hexes} />
      );
      expect(subject).toMatchSnapshot();
    });
  });
});
