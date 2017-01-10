import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Token from '../../src/components/token';

describe('Token', () => {
  describe('#render()', () => {
    it ('returns an svg represntation of the token', () => {
      const subject: ReactElement<Token> = (
        <Token
          text='ABC'
          primaryColor='red'
          secondaryColor='green'
          textColor='blue'
        />
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });
  });
});
