import { mount } from 'enzyme';
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
    const point: Point = new Point(50, 40);
    it('returns an svg representation of the circle', () => {
      const subject: React.ReactElement<CityCircle> = (
        <CityCircle point={point} hex='a1' index={1} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('context menu click', () => {
      let called: boolean;
      beforeEach(() => {
        called = false;
      });

      const fn: () => void = () => {
        called = true;
      };

      describe('when onContextMenu is set', () => {
        it('runs the passed in function', () => {
          const subject: React.ReactElement<CityCircle> = (
            <CityCircle point={point} hex='a1' index={1} onContextMenu={fn} />
          );

          mount(subject).simulate('contextMenu');
          expect(called).toBeTruthy();
        });
      });

      describe('when onContextMenu is not set', () => {
        it('does not run a context menu', () => {
          const subject: React.ReactElement<CityCircle> = (
            <CityCircle point={point} hex='a1' index={1} />
          );

          mount(subject).simulate('contextMenu');
          expect(called).toBeFalsy();
        });
      });
    });
  });
});
