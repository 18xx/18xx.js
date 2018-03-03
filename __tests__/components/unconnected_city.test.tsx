import { List } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';

import { CityProps } from '../../src/components/city';
import UnconnectedCity from '../../src/components/unconnected_city';

import { stubStore } from '../support/store';

describe('UnconnectedCity', () => {
  const defaultProps: CityProps =  {
    hex: 'a1',
    hexagon: new Hexagon('east-west'),
    homeTokens: List(),
    mapDef: {
      companies: [],
      invertHexes: false,
      orientation: 'east-west',
      tileManifest: [],
    },
    num: 1,
    tokenState: List(),
  };

  describe('render', () => {
    describe('when there is one city', () => {
      const subject: React.ReactElement<UnconnectedCity> = (
        <Provider store={stubStore}>
          <UnconnectedCity {...defaultProps} />
        </Provider>
      );

      it('returns the correct result', () => {
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when there are two cities', () => {
      const subject: React.ReactElement<UnconnectedCity> = (
        <Provider store={stubStore}>
          <UnconnectedCity {...defaultProps} num={2} />
        </Provider>
      );

      it('returns the correct result', () => {
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when there three cities', () => {
      const subject: React.ReactElement<UnconnectedCity> = (
        <Provider store={stubStore}>
          <UnconnectedCity {...defaultProps} num={3} />
        </Provider>
      );

      it('returns the correct result', () => {
        expect(() => renderer.create(subject)).toThrow();
      });
    });
  });
});
