import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { mapDefinition } from '../support/map_definition';

import AllTiles from '../../src/components/all_tiles';

describe('AllTiles', () => {
  describe('#render', () => {
    const subject: React.ReactElement<AllTiles> = (
      <AllTiles mapDef={mapDefinition} />
    );

    it('renders all tiles', () => {
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
