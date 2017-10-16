import { List } from 'immutable';

import Hexagon from '../src/hexagon';
import Point from '../src/point';
import Track from '../src/track';

describe('Track', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#isTightCurve()', () => {
    describe('when the sides are 1 apart', () => {
      it('should be true', () => {
        expect((new Track(1, 2, hexagon)).isTightCurve()).toEqual(true);
      });
    });

    describe('when the sides are 5 apart', () => {
      it('should be true', () => {
        expect((new Track(0, 5, hexagon)).isTightCurve()).toEqual(true);
      });
    });

    describe('when the sides are not 1 or 5 apart', () => {
      it('should be true', () => {
        expect((new Track(0, 3, hexagon)).isTightCurve()).toEqual(false);
      });
    });
  });

  describe('#isShallowCurve()', () => {
    describe('when the sides are 2 apart', () => {
      it('should be true', () => {
        expect((new Track(1, 3, hexagon)).isShallowCurve()).toEqual(true);
      });
    });

    describe('when the sides are 4 apart', () => {
      it('should be true', () => {
        expect((new Track(4, 0, hexagon)).isShallowCurve()).toEqual(true);
      });
    });

    describe('when the sides are not 2 or 4 apart', () => {
      it('should be true', () => {
        expect((new Track(0, 3, hexagon)).isShallowCurve()).toEqual(false);
      });
    });
  });

  describe('#isStraight()', () => {
    describe('when the sides are 3 apart', () => {
      it('should be true', () => {
        expect((new Track(4, 1, hexagon)).isStraight()).toEqual(true);
      });
    });

    describe('when the sides are not 3 apart', () => {
      it('should be true', () => {
        expect((new Track(0, 2, hexagon)).isStraight()).toEqual(false);
      });
    });
  });

  describe('#toString()', () => {
    describe('with a tight turn', () => {
      it('returns the right track svg', () => {
        expect(new Track(1, 2, hexagon).toString()).toMatchSnapshot();
      });
    });

    describe('with a shallow turn', () => {
      it('returns the right track svg', () => {
        expect(new Track(1, 3, hexagon).toString()).toMatchSnapshot();
      });
    });

    describe('with a straight', () => {
      it('returns the right track svg', () => {
        expect(new Track(1, 4, hexagon).toString()).toMatchSnapshot();
      });
    });
  });

  describe('#midpoints()', () => {
    describe('when attempting to get one midpoint', () => {
      it('returns the midpoint of the track', () => {
        const midpoint: Point = new Track(
          0, 1, hexagon
        ).midpoints(1).first()!;
        expect(midpoint.x).toBeCloseTo(83.138);
        expect(midpoint.y).toBeCloseTo(48);
      });
    });

    describe('when attempting to get two midpoints', () => {
      it('returns points 1/3rd and 2/3rd of the way', () => {
        const midpoints: List<Point> = new Track(
          0, 2, hexagon
        ).midpoints(2);
        expect(midpoints.get(0)!.x).toBeCloseTo(49.143);
        expect(midpoints.get(0)!.y).toBeCloseTo(41.540);
        expect(midpoints.get(1)!.x).toBeCloseTo(78.017);
        expect(midpoints.get(1)!.y).toBeCloseTo(58.210);
      });
    });
  });
});
