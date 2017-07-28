import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Token from './token';

import Company from '../company';

export interface AvailableTokensProps {
  readonly companies: List<Company>;
  readonly onClick: (company: Company) => void;
}

class AvailableTokens extends React.Component<AvailableTokensProps, {}> {

  get tokens(): List<ReactElement<Token>> {
    return this.props.companies.map(company =>
      <span
      key={company.shorthand}
      onClick={ () => this.props.onClick(company) }>
        <Token
        text={company.shorthand}
        primaryColor={company.primaryColor}
        secondaryColor={company.secondaryColor}
        textColor={company.textColor} />
      </span>
    ).toList();
  }

  public render(): ReactElement<AvailableTokens> {
    return <div id='tokenMenu'>{this.tokens}</div>;
  }
}

export default AvailableTokens;
