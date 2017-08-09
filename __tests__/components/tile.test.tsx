import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Tile, { TileProps } from '../../src/components/tile';

describe('Tile', () => {
  describe('constants', () => {
    it('returns the correct values for all constants', () => {
      expect(Tile.SIDE_LENGTH).toEqual(64);
      expect(Tile.HEIGHT).toEqual(128);
      expect(Tile.WIDTH).toBeCloseTo(110.851);
      expect(Tile.CENTER.x).toBeCloseTo(55.425);
      expect(Tile.CENTER.y).toEqual(64);
    });
  });

  describe('#hexColor', () => {
    describe('when the color is yellow', () => {
      it('returns yellow', () => {
        const tile: Tile = new Tile({
          color: 'yellow',
          orientation: 'east-west',
        });
        expect(tile.hexColor).toEqual('yellow');
      });
    });

    describe('when the color is green', () => {
      it('returns limegreen', () => {
        const tile: Tile = new Tile({
          color: 'green',
          orientation: 'east-west',
        });
        expect(tile.hexColor).toEqual('limegreen');
      });
    });

    describe('when the color is brown', () => {
      it('returns #80461B', () => {
        const tile: Tile = new Tile({
          color: 'brown',
          orientation: 'east-west',
        });
        expect(tile.hexColor).toEqual('#b0763f');
      });
    });

    describe('when the color is gray', () => {
      it('returns #bbb', () => {
        const tile: Tile = new Tile({
          color: 'gray',
          orientation: 'east-west',
        });
        expect(tile.hexColor).toEqual('#bbb');
      });
    });
  });

  describe('render', () => {
    const props: TileProps = {
      color: 'yellow',
      orientation: 'east-west',
    };

    it('renders the svg of the tile', () => {
      const subject: React.ReactElement<Tile> = <Tile {...props} />;
      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('when the orientation is north-south', () => {
      it('renders the svg of the tile', () => {
        const subject: React.ReactElement<Tile> = (
          <Tile {...props} orientation='north-south' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
