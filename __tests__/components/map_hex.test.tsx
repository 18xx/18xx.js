import { mount } from 'enzyme';
import { List } from 'immutable';

import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import { MapDefinition } from '../../src/map_builder';

import MapHex from '../../src/components/map_hex';
import Tile from '../../src/components/tile';

describe('MapHex', () => {
  const mapDef: MapDefinition = {
    companies: {},
    hexes: {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
    },
    orientation: 'east-west',
    tileManifest: {},
  };

  describe('#absoluteLeft', () => {
    describe('when column is one', () => {
      it('returns zero', () => {
        const subject: MapHex = new MapHex({ mapDef, row: 'b', column: 1 });
        expect(subject.absoluteLeft).toEqual(0);
      });
    });

    describe('when column is 6', () => {
      describe('when the orentation is north-south', () => {
        it('returns 480', () => {
          const subject: MapHex = new MapHex({
            column: 6,
            mapDef: { ...mapDef, orientation: 'north-south' },
            row: 'b',
          });
          expect(subject.absoluteLeft).toEqual(480);
        });

        describe('when hexes are inverted', () => {
          const subject: MapHex = new MapHex({
            column: 6,
            mapDef: {
              ...mapDef,
              invertHexes: true,
              orientation: 'north-south'
            },
            row: 'b',
          });
          it('returns 96', () => {
            expect(subject.absoluteLeft).toEqual(96);
          });
        });
      });

      describe('when the orentation is east-west', () => {
        it('returns 277.5', () => {
          const subject: MapHex = new MapHex({ mapDef, row: 'b', column: 6 });
          expect(subject.absoluteLeft).toBeCloseTo(277.128);
        });

        describe('when hexes are inverted', () => {
          const subject: MapHex = new MapHex({
            column: 6,
            mapDef: { ...mapDef, invertHexes: true, },
            row: 'b',
          });
          it('returns 55.4', () => {
            expect(subject.absoluteLeft).toBeCloseTo(55.4265);
          });
        });
      });
    });
  });

  describe('#absoluteTop', () => {
    describe('when row is a', () => {
      it('returns zero', () => {
        const subject: MapHex = new MapHex({ mapDef, row: 'a', column: 1 });
        expect(subject.absoluteTop).toEqual(0);
      });
    });

    describe('when row is g', () => {
      describe('when the orentation is north-south', () => {
        it('returns 332.554', () => {
          const subject: MapHex = new MapHex({
            column: 6,
            mapDef: { ...mapDef, orientation: 'north-south' },
            row: 'g',
          });
          expect(subject.absoluteTop).toBeCloseTo(332.554);
        });

        describe('when hexes are inverted', () => {
          const subject: MapHex = new MapHex({
            column: 6,
            mapDef: {
              ...mapDef,
              invertHexes: true,
              orientation: 'north-south'
            },
            row: 'g',
          });

          it('returns 277.128', () => {
            expect(subject.absoluteTop).toBeCloseTo(277.128);
          });
        });
      });

      describe('when the orentation is east-west', () => {
        it('returns 576', () => {
          const subject: MapHex = new MapHex({ mapDef, row: 'g', column: 6 });
          expect(subject.absoluteTop).toEqual(576);
        });

        describe('when hexes are inverted', () => {
          const subject: MapHex = new MapHex({
            column: 6,
            mapDef: { ...mapDef, invertHexes: true },
            row: 'g',
          });

          it('returns 480', () => {
            expect(subject.absoluteTop).toEqual(480);
          });
        });
      });
    });

    describe('when row is h', () => {
      const subject: MapHex = new MapHex({ mapDef, row: 'h', column: 6 });
      it('returns 576', () => {
        expect(() => subject.absoluteTop).toThrow();
      });
    });
  });

  describe('#absoluteCenter', () => {
    describe('when the orentation is north-south', () => {
      it('returns the hex center', () => {
        const subject: MapHex = new MapHex({
          column: 6,
          mapDef: { ...mapDef, orientation: 'north-south' },
          row: 'g',
        });
        expect(subject.absoluteCenter.x).toBeCloseTo(544);
        expect(subject.absoluteCenter.y).toBeCloseTo(387.979);
      });
    });

    describe('when the orentation is east-west', () => {
      it('returns the hex center', () => {
        const subject: MapHex = new MapHex({ mapDef, row: 'g', column: 6 });
        expect(subject.absoluteCenter.x).toBeCloseTo(332.554);
        expect(subject.absoluteCenter.y).toBeCloseTo(640);
      });
    });
  });

  describe('#hex', () => {
    it('returns the row and column', () => {
      const subject: MapHex = new MapHex({ mapDef, row: 'u', column: 46 });
      expect(subject.hex).toEqual('u46');
    });
  });

  describe('#render', () => {
    it('returns the SVG for this element', () => {
      const subject: any = renderer.create(
        <MapHex mapDef={mapDef} row='e' column={11} />
      );
      expect(subject).toMatchSnapshot();
    });

    describe('when it contains a tile', () => {
      it('draws the tile at the end', () => {
        const tile: ReactElement<Tile> = (
          <Tile color='yellow' orientation='east-west' />
        );
        const subject: any = renderer.create(
          <MapHex mapDef={mapDef} row='e' column={11} tile={tile} />
        );
        expect(subject).toMatchSnapshot();
      });
    });

    describe('when it contains some elements', () => {
      it('draws the tile at the end', () => {
        const elements: List<string> = List(['ELEMENT']);
        const subject: any = renderer.create(
          <MapHex mapDef={mapDef} row='e' column={11} elements={elements} />
        );
        expect(subject).toMatchSnapshot();
      });
    });

    it('invokes the click method', () => {
      const fn: any = jest.fn();
      const subject: ReactElement<MapHex> = (
        <MapHex mapDef={mapDef} row='e' column={11} onHexClick={fn} />
      );
      mount(subject).simulate('click');
      expect(fn.mock.calls.length).toEqual(1);
    });

    describe('when on click is not set', () => {
      it('renders correctly', () => {
        const subject: ReactElement<MapHex> = (
          <MapHex mapDef={mapDef} row='e' column={1} onHexClick={undefined} />
        );
        expect(subject).toMatchSnapshot();
      });
    });
  });
});
