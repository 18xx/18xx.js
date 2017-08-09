import { List } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';

import City, { CityProps } from '../../src/components/city';

describe('City', () => {
  const defaultProps: CityProps =  {
    hex: 'a1',
    hexagon: new Hexagon('east-west'),
    homeTokens: List(),
    mapDef: { companies: [], tileManifest: []},
    num: 1,
    onRightClickCity: jest.fn(),
    onRightClickToken: jest.fn(),
    tokenState: List(),
  };

  describe('when there is one city', () => {
    it('renders an svg for the city', () => {
      const subject: React.ReactElement<City> = (
        <City {...defaultProps} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are two cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <City {...defaultProps} num={2} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are three cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <City {...defaultProps} num={3} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are four cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <City {...defaultProps} num={4} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });

  describe('when there are five cities', () => {
    it('throws an error', () => {
      const subject: React.ReactElement<City> = (
        <City {...defaultProps} num={5} />
      );

      expect(() => renderer.create(subject)).toThrow(
        'Unsupported number of cities'
      );
    });
  });

  describe('when there are six cities', () => {
    it('renders an svg for the cities', () => {
      const subject: React.ReactElement<City> = (
        <City {...defaultProps} num={6} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
