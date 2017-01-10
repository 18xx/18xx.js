import CityCircle from '../../src/components/city_circle';

import Point from '../../src/point';

describe('CityCircle', () => {
  describe('.RADIUS', () => {
    it('returns the value of the RADIUS const', () => {
      expect(CityCircle.RADIUS).toEqual(19);
    });
  });

  describe('.STROKE_WIDTH', () => {
    it('returns the value of the STROKE_WIDTH const', () => {
      expect(CityCircle.STROKE_WIDTH).toEqual(2);
    });
  });

  describe('#toString()', () => {
    it('returns an svg representation of the circle', () => {
      const point: Point = new Point(50, 40);
      const cc: CityCircle = new CityCircle({ point });
      expect(cc.toString()).toMatchSnapshot();
    });
  });
});
