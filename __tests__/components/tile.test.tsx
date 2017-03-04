import Tile from '../../src/components/tile';

import Point from '../../src/point';

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
      it('returns #80461B', () => {
        const tile: Tile = new Tile({
          color: 'gray',
          orientation: 'east-west',
        });
        expect(tile.hexColor).toEqual('#bbb');
      });
    });
  });

  describe('#toString()', () => {
    it('returns an svg document', () => {
      const tile: Tile = new Tile({
        color: 'yellow',
        orientation: 'east-west',
      });
      expect(tile.toString()).toMatchSnapshot();
    });
  });
});
