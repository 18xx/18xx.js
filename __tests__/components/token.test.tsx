import * as React from 'react';
import { ReactElement } from 'react';
import * as renderer from 'react-test-renderer';

import Token, { TokenProps } from '../../src/components/token';

describe('Token', () => {
  describe('#render()', () => {
    const props: TokenProps = {
      primaryColor: 'red',
      secondaryColor: 'green',
      text: 'ABC',
      textColor: 'blue',
    };

    it ('returns an svg represntation of the token', () => {
      const subject: ReactElement<Token> = (
        <Token {...props} />
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('when the text is faded', () => {
      const subject: ReactElement<Token> = (
        <Token {...props} faded={true} />
      );
      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('when the text is a number', () => {
      it ('returns an svg represntation of the token', () => {
        const subject: ReactElement<Token> = (
          <Token {...props} text='2' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
