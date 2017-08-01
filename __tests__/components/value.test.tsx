import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';
import Point from '../../src/point';

import Value, { ValueProps } from '../../src/components/value';

describe('Value', () => {
  describe('render', () => {
    const props: ValueProps = {
      amount: 10,
      hexagon: new Hexagon('east-west'),
    };

    describe('when a position is specified', () => {
      const subject: React.ReactElement<Value> = (
        <Value { ...props} position={new Point(1, 2)} />
      );

      it('renders something matching the snapshot', () => {
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when a position is not specified', () => {
      describe('when the hex uses an east-west orientation', () => {
        const subject: React.ReactElement<Value> = (
          <Value { ...props} />
        );

        it('renders something matching the snapshot', () => {
          expect(renderer.create(subject)).toMatchSnapshot();
        });
      });

      describe('when the hex uses a north-south orientation', () => {
        const subject: React.ReactElement<Value> = (
          <Value { ...props} hexagon={new Hexagon('north-south')} />
        );

        it('renders something matching the snapshot', () => {
          expect(renderer.create(subject)).toMatchSnapshot();
        });
      });
    });
  });
});
