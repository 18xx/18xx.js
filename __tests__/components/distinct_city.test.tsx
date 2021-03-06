import { List } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import { mapDefinition } from '../support/map_definition';

import Hexagon from '../../src/hexagon';
import Point from '../../src/point';

import { CityProps } from '../../src/components/city';
import DistinctCity from '../../src/components/distinct_city';

import { stubStore } from '../support/store';

describe('DistinctCity', () => {
  const defaultProps: CityProps =  {
    hex: 'a1',
    hexagon: new Hexagon('north-south'),
    homeTokens: List(),
    mapDef: mapDefinition,
    num: 1,
    points: List([new Point(30, 40)]),
    spotLocations: [1, 2],
    tokenState: List(),
  };

  it('renders correctly', () => {
    const subject: React.ReactElement<DistinctCity> = (
      <Provider store={stubStore}>
        <DistinctCity {...defaultProps} />
      </Provider>
    );

    expect(renderer.create(subject)).toMatchSnapshot();
  });

  describe('when no spots are specified', () => {
    it('raises an error', () => {
      const subject: React.ReactElement<DistinctCity> = (
        <Provider store={stubStore}>
          <DistinctCity {...defaultProps} spotLocations={undefined} />
        </Provider>
      );
      expect(() => renderer.create(subject)).toThrow(
        'DistinctCity requires spotLocations'
      );
    });
  });

  describe('when there are more than two spots', () => {
    it('uses a smaller radius', () => {
      const subject: React.ReactElement<DistinctCity> = (
        <Provider store={stubStore}>
          <DistinctCity {...defaultProps} spotLocations={[1, 2, 3, 5]} />
        </Provider>
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
