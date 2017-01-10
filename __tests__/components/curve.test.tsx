import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Curve from '../../src/components/curve';

import Point from '../../src/point';

describe('Curve', () => {
  describe('#toString', () => {
    it('returns an svg path element', () => {
      const subject: ReactElement<Curve> = (
        <Curve
          point1={new Point(1, 2)}
          point2={new Point(3, 4)}
          radius={5}
        />
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
