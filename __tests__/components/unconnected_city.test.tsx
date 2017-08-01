import { List } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ReactTestInstance } from 'react-test-renderer';

import Hexagon from '../../src/hexagon';

import { CityProps } from '../../src/components/city';
import UnconnectedCity from '../../src/components/unconnected_city';

describe('UnconnectedCity', () => {
  const defaultProps: CityProps =  {
    hexagon: new Hexagon('east-west'),
    homeTokens: List(),
    mapDef: { companies: [], tileManifest: []},
    num: 1,
    onRightClickCity: jest.fn(),
    onRightClickToken: jest.fn(),
    tokenState: List(),
  };

  describe('render', () => {
    describe('when there is one city', () => {
      const subject: React.ReactElement<UnconnectedCity> = (
        <UnconnectedCity {...defaultProps} />
      );

      it('returns the correct result', () => {
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when there are two cities', () => {
      const subject: React.ReactElement<UnconnectedCity> = (
        <UnconnectedCity {...defaultProps} num={2} />
      );

      it('returns the correct result', () => {
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when there three cities', () => {
      const subject: React.ReactElement<UnconnectedCity> = (
        <UnconnectedCity {...defaultProps} num={3} />
      );

      it('returns the correct result', () => {
        expect(() => renderer.create(subject)).toThrow();
      });
    });
  });
});