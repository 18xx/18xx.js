import { mount } from 'enzyme';
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

    it('returns an svg represntation of the token', () => {
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
      it('returns an svg represntation of the token', () => {
        const subject: ReactElement<Token> = (
          <Token {...props} text='2' />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('context menu click', () => {
      let params: string[];

      beforeEach(() => {
        params = [];
      });

      const fn: (hex: string, index: number) => void = (hex, index) => {
        params = [hex, index.toString()];
      };

      describe('when required info is not specified', () =>  {
        const subject: ReactElement<Token> = (
          <Token {...props} index={1} hex='b3' />
        );

        it('does not call on right click', () => {
          mount(subject).simulate('contextMenu');
          expect(params).toEqual([]);
        });
      });

      describe('when required info is specified', () =>  {
        const subject: ReactElement<Token> = (
          <Token {...props} index={1} hex='b3' onRightClick={fn} />
        );

        const preventDefault: any = jest.fn();

        it('calls on right click', () => {
          mount(subject).simulate('contextMenu');
          expect(params).toEqual(['b3', '1']);
        });

        it('prevents the default event', () => {
          mount(subject).simulate('contextMenu', { preventDefault });
          expect(preventDefault.mock.calls.length).toBe(1);
        });
      });
    });
  });
});
