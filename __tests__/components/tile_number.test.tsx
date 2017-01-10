import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import TileNumber from '../../src/components/tile_number';

describe('TileNumber', () => {
  describe('#toString()', () => {
    describe('when providing a rotation number', () => {
      it('returns the svg text for the tile', () => {
        const subject: ReactElement<TileNumber> = (
          <TileNumber num='54' orientation={2} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when not providing a rotation number', () => {
      it('returns the svg text for the tile', () => {
        const subject: ReactElement<TileNumber> = (
          <TileNumber num='54' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
