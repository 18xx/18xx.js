import { List } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Company from '../../src/company';

import AvailableTokens from '../../src/components/available_tokens';

describe('AvailableTokens', () => {
  const companies: List<Company> = List([
    Company.fromJson(
      'B&O',
      {
        home: 'i15',
        name: 'Baltimore and Ohio Railroad',
        primaryColor: '#0B00F7',
        secondaryColor: 'white',
        shorthand: 'B&O',
        textColor: 'black',
        tokens: 3,
      },
    )
  ]);

  it('renderes a list of tokens', () => {
    const subject: React.ReactElement<AvailableTokens> = (
      <AvailableTokens companies={companies} onClick={jest.fn()} />
    );

    expect(renderer.create(subject)).toMatchSnapshot();
  });
});
