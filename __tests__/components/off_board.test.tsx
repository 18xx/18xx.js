import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import OffBoard from '../../src/components/off_board';

describe('OffBoard', () => {
  describe('#toString', () => {
    describe('when the east exit is set', () => {
      it('draws an arrow on the right of the hex', () => {
        const subject: ReactElement<OffBoard> = (
          <OffBoard key='off-board' exits={List<number>([0])} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when the west exit is set', () => {
      it('draws an arrow on the left of the hex', () => {
        const subject: ReactElement<OffBoard> = (
          <OffBoard key='off-board' exits={List<number>([3])} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when the north west exit is set', () => {
      it('draws an arrow on the top left of the hex', () => {
        const subject: ReactElement<OffBoard> = (
          <OffBoard key='off-board' exits={List<number>([2])} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when the north east exit is set', () => {
      it('draws an arrow on the top right of the hex', () => {
        const subject: ReactElement<OffBoard> = (
          <OffBoard key='off-board' exits={List<number>([1])} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when the south west exit is set', () => {
      it('draws an arrow on the bottom left of the hex', () => {
        const subject: ReactElement<OffBoard> = (
          <OffBoard key='off-board' exits={List<number>([4])} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when the south east exit is set', () => {
      it('draws an arrow on the bottom right of the hex', () => {
        const subject: ReactElement<OffBoard> = (
          <OffBoard key='off-board' exits={List<number>([5])} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
