import { List } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Point from '../../src/point';

import MediumCity from '../../src/components/medium_city';

describe('MediumCity', () => {
  describe('render', () => {
    it('renders an svg', () => {
      const points: List<Point> = List([
        new Point(10, 20),
        new Point(40, 40),
      ]);

      const subject: React.ReactElement<MediumCity> = (
        <MediumCity points={points} />
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
