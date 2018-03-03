import { List } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';

import City, { CityProps } from '../../src/components/city';

import { stubStore } from '../support/store';

describe('City', () => {
  const defaultProps: CityProps =  {
    hex: 'a1',
    hexagon: new Hexagon('east-west'),
    homeTokens: List(),
    mapDef: {
      companies: [],
      invertHexes: false,
      orientation: 'east-west',
      tileManifest: []
    },
    num: 1,
    tokenState: List(),
  };

  describe('when there is one city', () => {
    it('renders an svg for the city', () => {
      const subject: React.ReactElement<City> = (
        <Provider store={stubStore}>
          <City {...defaultProps} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are two cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <Provider store={stubStore}>
          <City {...defaultProps} num={2} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are three cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <Provider store={stubStore}>
          <City {...defaultProps} num={3} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are four cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <Provider store={stubStore}>
          <City {...defaultProps} num={4} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are five cities', () => {
    it('throws an error', () => {
      const subject: React.ReactElement<City> = (
        <Provider store={stubStore}>
          <City {...defaultProps} num={5} />
        </Provider>
      );

      expect(() => renderer.create(subject)).toThrow(
        'Unsupported number of cities'
      );
    });
  });

  describe('when there are six cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <Provider store={stubStore}>
          <City {...defaultProps} num={6} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
