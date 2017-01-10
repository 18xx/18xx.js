import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Town from '../../src/components/town';

import Point from '../../src/point';

describe('Town', () => {
  describe('#toString', () => {
    it('returns the svg for a circle centered on the point', () => {
      const point: Point = new Point(4, 6);
      const points: List<Point> = List<Point>([point]);
      expect(renderer.create(<Town points={points} />)).toMatchSnapshot();
    });
  });
});
