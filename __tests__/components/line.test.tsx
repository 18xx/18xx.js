import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Line from '../../src/components/line';

import Point from '../../src/point';

describe('Line', () => {
  describe('#toString', () => {
    it('returns an svg path element', () => {
      const subject: ReactElement<Line> = (
        <Line
          point1={new Point(1, 2)}
          point2={new Point(3, 4)}
        />
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
