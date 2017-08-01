import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import TileCost, { TileCostProps } from '../../src/components/tile_cost';

import Hexagon from '../../src/hexagon';
import Point from '../../src/point';

describe('TileCost', () => {
  const hexagon: Hexagon = new Hexagon('east-west');
  const props: TileCostProps = {
    amount: 10,
    color: '#ccc',
    hexagon,
    shape: 'triangle',
  };

  describe('#toString', () => {
    describe('when shape is a triangle', () => {
      it('returns an svg representation of a triangle', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost {...props} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when the hexagon orientation is north south', () => {
      it('moves the default location', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost {...props} hexagon={new Hexagon('north-south')} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when shape is not a triangle', () => {
      it('returns an svg representation of a square', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost {...props} amount={14} shape='square' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when locations is set', () => {
      it('returns an svg located at the point specified', () => {
        const subject: ReactElement<TileCost> = (
          <TileCost {...props} amount={20} color='white' shape='square'
            location={new Point(3, 7)} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
