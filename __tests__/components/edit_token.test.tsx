import * as React from 'react';
import * as renderer from 'react-test-renderer';

import EditToken from '../../src/components/edit_token';

describe('EditToken', () => {
  describe('#render', () => {
    const subject: React.ReactElement<EditToken> = (
      <EditToken onRemoveToken={jest.fn()} />
    );

    it('matches the rendered snapshot', () => {
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
