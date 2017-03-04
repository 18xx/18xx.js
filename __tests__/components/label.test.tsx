import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Label from '../../src/components/label';
import Tile from '../../src/components/tile';

import Hexagon from '../../src/hexagon';
import Point from '../../src/point';

describe('Label', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#toString()', () => {
    describe('when the point is not specified', () => {
      it('returns the svg for the element at the default position', () => {
        const label: ReactElement<Label> = (
          <Label hexagon={hexagon} labelStr='B' />
        );
        expect(renderer.create(label)).toMatchSnapshot();
      });
    });

    describe('when the point is specified', () => {
      describe('when the x point is less than the center', () => {
        it('returns start', () => {
          const label: ReactElement<Label> = (
            <Label hexagon={hexagon} labelStr='B' point={new Point(55, 0)} />
          );
          expect(renderer.create(label)).toMatchSnapshot();
        });
      });

      describe('when the x point is equal to the center', () => {
        it('returns middle', () => {
          const label: ReactElement<Label> = (
            <Label
            hexagon={hexagon}
            labelStr='B'
            point={new Point(Tile.WIDTH / 2, 0)} />
          );
          expect(renderer.create(label)).toMatchSnapshot();
        });
      });

      describe('when the x point is greater than the center', () => {
        it('returns end', () => {
          const label: ReactElement<Label> = (
            <Label hexagon={hexagon} labelStr='B' point={new Point(56, 0)} />
          );
          expect(renderer.create(label)).toMatchSnapshot();
        });
      });
    });
  });
});
