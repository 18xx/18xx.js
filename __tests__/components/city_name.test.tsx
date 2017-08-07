import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import CityName from '../../src/components/city_name';

import Point from '../../src/point';

describe('CityName', () => {
  describe('#render()', () => {
    it('returns an svg representation of the name at a point', () => {
      const subject: ReactElement<CityName> = (
        <CityName
          point={new Point(4, 1)}
          name='Toronto' />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('when the name is  over 12 characters long', () => {
      it('uses a smaller font size', () => {
        const subject: ReactElement<CityName> = (
          <CityName
            point={new Point(4, 1)}
            name='New Amsterdam' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
