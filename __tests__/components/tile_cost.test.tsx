import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import TileCost from '../../src/components/tile_cost';

import Point from '../../src/point';

describe('TileCost', () => {
  describe('#toString', () => {
    describe('when shape is a triangle', () => {
      it('returns an svg representation of a triangle', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost amount={10} color='#ccc' shape='triangle' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when shape is not a triangle', () => {
      it('returns an svg representation of a square', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost amount={14} color='#ddd' shape='square' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when locations is set', () => {
      it('returns an svg located at the point specified', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost
            amount={20}
            color='white'
            location={new Point(3, 7)}
            shape='square' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
