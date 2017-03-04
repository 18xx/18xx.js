import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Hexagon from '../../src/hexagon';

import TileNumber from '../../src/components/tile_number';

describe('TileNumber', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#toString()', () => {
    describe('when providing a rotation number', () => {
      it('returns the svg text for the tile', () => {
        const subject: ReactElement<TileNumber> = (
          <TileNumber hexagon={hexagon} num='54' orientation={2} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when not providing a rotation number', () => {
      it('returns the svg text for the tile', () => {
        const subject: ReactElement<TileNumber> = (
          <TileNumber hexagon={hexagon} num='54' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
