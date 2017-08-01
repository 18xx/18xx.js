import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';
import Point from '../../src/point';

import Tile from '../../src/components/tile';
import TileNumber, { TileNumberProps } from '../../src/components/tile_number';

describe('TileNumber', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#render()', () => {
    const props: TileNumberProps = {
      hexagon,
      num: '54',
    };

    describe('when providing a rotation number', () => {
      it('returns the svg for the tile', () => {
        const subject: ReactElement<TileNumber> = (
          <TileNumber {...props} orientation={2} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when not providing a rotation number', () => {
      it('returns the svg for the tile', () => {
        const subject: ReactElement<TileNumber> = (
          <TileNumber {...props} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when at a specific point', () => {
      const point: Point = new Point(5, 6);

      describe('when the hexagon is east-west orientation', () => {
        it('returns the svg for the tile', () => {
          const subject: ReactElement<TileNumber> = (
            <TileNumber {...props} point={point} />
          );
          expect(renderer.create(subject)).toMatchSnapshot();
        });
      });

      describe('when the hexagon is north-south orientation', () => {
        it('returns the svg for the tile', () => {
          const nsHex: Hexagon = new Hexagon('north-south');
          const subject: ReactElement<TileNumber> = (
            <TileNumber {...props} hexagon={nsHex} />
          );
          expect(renderer.create(subject)).toMatchSnapshot();
        });
      });

      describe('when the point is at the tile center', () => {
        it('returns the svg for the tile', () => {
          const subject: ReactElement<TileNumber> = (
            <TileNumber {...props} point={Tile.CENTER} />
          );
          expect(renderer.create(subject)).toMatchSnapshot();
        });
      });
    });
  });
});
