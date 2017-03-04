import { ReactElement } from 'react';

import * as mapDef1830 from '../config/maps/1830.json';

import Tile from '../src/components/tile';

import { MapDefinition } from '../src/map_builder';
import TileDefinition, { TileDefinitionInput } from '../src/tile_definition';
import Track from '../src/track';

const mapDef: MapDefinition = mapDef1830 as any;

describe('TileDefinition', () => {
  describe('#num', () => {
    it('returns the number specifieid', () => {
      expect(
        new TileDefinition(
          mapDef,
          { color: 'green', num: '5' },
          'east-west'
        ).num
      ).toEqual('5');
    });
  });

  describe('#color', () => {
    it('returns the color specifieid', () => {
      expect(
        new TileDefinition(
          mapDef,
          { color: 'gray', num: '1' },
          'east-west'
        ).color
      ).toEqual('gray');
    });
  });

  describe('#label', () => {
    it('returns the label specifieid', () => {
      expect(
        new TileDefinition(
          mapDef,
          {
            color: 'yellow',
            label: 'NY',
            num: '1',
          },
          'east-west',
        ).label).toEqual('NY');
    });
  });

  describe('#rotations', () => {
    describe('when the definition specified a number of rotations', () => {
      it('returns the number specified in the definition', () => {
        expect(
          new TileDefinition(
            mapDef,
            {
              color: 'yellow',
              num: '1',
              rotations: 3
            },
            'east-west',
          ).rotations
        ).toEqual(3);
      });
    });

    describe('when it does not specify a number of rotations', () => {
      it('returns 6', () => {
        expect(
          new TileDefinition(
            mapDef,
            { color: 'yellow', num: '1' },
            'east-west',
          ).rotations
        ).toEqual(6);
      });
    });
  });

  describe('#allRotations', () => {
    const json: TileDefinitionInput = {
      color: 'yellow',
      num: '7',
      rotations: 2,
      track: [
        [0, 1]
      ]
    };

    it('returns a tile for each rotation', () => {
      const tileDefinition: TileDefinition = new TileDefinition(
        mapDef,
        json,
        'east-west',
      );
      expect(tileDefinition.allRotations.size).toEqual(2);
    });
  });

  describe('#tile()', () => {
    it('returns a built tile from the definition for the rotation', () => {
      const json: TileDefinitionInput = {
        color: 'yellow',
        num: '7',
        track: [
          [0, 1]
        ]
      };
      const subject: ReactElement<Tile> = new TileDefinition(
        mapDef,
        json,
        'east-west'
      ).tile(1);

      expect(subject.props.color).toEqual('yellow');
      // FIXME: Better test
    });
  });
});
