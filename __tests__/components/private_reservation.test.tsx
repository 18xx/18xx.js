import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';

import PrivateReservation, {
  PrivateReservationProps
} from '../../src/components/private_reservation';

describe('PrivateReservation', () => {
  describe('render', () => {
    const props: PrivateReservationProps = {
      hexagon: new Hexagon('north-south'),
      name: 'C&A',
    };

    describe('when orientation is east-west', () => {
      it('renders an svg', () => {
        const subject: React.ReactElement<PrivateReservation> = (
          <PrivateReservation {...props} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when orientation is north-south', () => {
      it('renders an svg', () => {
        const subject: React.ReactElement<PrivateReservation> = (
          <PrivateReservation {...props} hexagon={new Hexagon('east-west')} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
