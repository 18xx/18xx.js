import { List } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import { mapDefinition } from '../support/map_definition';

import Hexagon from '../../src/hexagon';
import Point from '../../src/point';

import { CityProps } from '../../src/components/city';
import DoubleOCity from '../../src/components/double_o_city';

import { stubStore } from '../support/store';

describe('DoubleOCity', () => {
  const defaultProps: CityProps =  {
    hex: 'a1',
    hexagon: new Hexagon('north-south'),
    homeTokens: List(),
    mapDef: mapDefinition,
    num: 1,
    points: List([new Point(30, 40)]),
    tokenState: List(),
  };

  it('renders correctly', () => {
    const subject: React.ReactElement<DoubleOCity> = (
      <Provider store={stubStore}>
        <DoubleOCity {...defaultProps} />
      </Provider>
    );

    expect(renderer.create(subject)).toMatchSnapshot();
  });

  describe('when there are two cities', () => {
    it('renders a NYC specific tile', () => {
      const subject: React.ReactElement<DoubleOCity> = (
        <Provider store={stubStore}>
          <DoubleOCity {...defaultProps} num={2} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are no points', () => {
    const subject: React.ReactElement<DoubleOCity> = (
      <Provider store={stubStore}>
        <DoubleOCity {...defaultProps} points={undefined} />
      </Provider>
    );

    expect(() => renderer.create(subject)).toThrow();
  });
});
