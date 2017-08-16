import * as React from 'react';
import * as renderer from 'react-test-renderer';

import CityCircle from '../../src/components/city_circle';

import Point from '../../src/point';

describe('CityCircle', () => {
  describe('.DEFAULT_RADIUS', () => {
    it('returns the value of the DEFAULT_RADIUS const', () => {
      expect(CityCircle.DEFAULT_RADIUS).toEqual(19);
    });
  });

  describe('.STROKE_WIDTH', () => {
    it('returns the value of the STROKE_WIDTH const', () => {
      expect(CityCircle.STROKE_WIDTH).toEqual(2);
    });
  });

  describe('#render()', () => {
    it('returns an svg representation of the circle', () => {
      const point: Point = new Point(50, 40);
      const subject: React.ReactElement<CityCircle> = (
        <CityCircle point={point} hex='a1' index={1} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
