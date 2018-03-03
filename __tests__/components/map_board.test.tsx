import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';
import { ReactTestInstance } from 'react-test-renderer';

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
  invertHexes: false,
  orientation: 'east-west',
  tileManifest: {},
};

describe('MapBoard', () => {
  describe('#render()', () => {
    const hexes: List<ReactElement<MapHex>> = List([
      <MapHex mapDef={mapDef} row='a' column={1} key='a1' />,
      <MapHex mapDef={mapDef} row='a' column={3} key='a3' />,
    ]);
    const defaultProps: MapBoardProps = {
      hexes,
      invertHexes: false,
      orientation: 'east-west',
    };

    it('returns an svg representation of the map board', () => {
      const subject: ReactTestInstance = renderer.create(
        <MapBoard {...defaultProps} />
      );
      expect(subject).toMatchSnapshot();
    });

    describe('with inverted hexes', () => {
      it('returns an svg representation of the map board', () => {
        const subject: ReactTestInstance = renderer.create(
          <MapBoard {...defaultProps} invertHexes={true} />
        );
        expect(subject).toMatchSnapshot();
      });
    });

    describe('when a north-south board', () => {
      it('returns an svg representation of the map board', () => {
        const subject: ReactTestInstance = renderer.create(
          <MapBoard {...defaultProps} orientation={'north-south'} />
        );
        expect(subject).toMatchSnapshot();
      });
    });
  });
});
