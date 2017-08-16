import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import CityCircleInterface from './components/city_circle';
import TokenInterface from './components/token';

import CityCircle from './containers/city_circle';
import Token from './containers/token';

import Company from './company';
import { MapDefinition } from './map_builder';
import Point from './point';

class CityCircleFactory {
  constructor(
    private mapDef: MapDefinition,
    private hex: string,
    private homeTokens: List<string>,
    private tokenState: List<string>,
    private radius: number = CityCircleInterface.DEFAULT_RADIUS,
  ) {
  }

  public build(
    index: number,
    point: Point
  ): ReactElement<CityCircleInterface> {
    return (
      <CityCircle
        hex={this.hex}
        index={index}
        key={point.toString()}
        point={point}
        radius={this.radius}>
        {this.buildToken(index, point)}
      </CityCircle>
    );
  }

  private buildToken(index: number, point: Point):
    ReactElement<TokenInterface> | undefined {
    let token: ReactElement<TokenInterface> | undefined;
    let faded: boolean = false;
    let companyMark: string | undefined;

    if (this.tokenState.get(index)) {
      companyMark = this.tokenState.get(index);
    } else if (this.homeTokens.get(index)) {
      companyMark = this.homeTokens.get(index);
      faded = true;
    }

    if (companyMark) {
      const company: Company = Company.fromJson(
        companyMark,
        this.mapDef.companies[companyMark]
      );

      token = (
        <Token
        faded={faded}
        hex={this.hex}
        index={index}
        text={company.shorthand}
        primaryColor={company.primaryColor}
        radius={this.radius}
        secondaryColor={company.secondaryColor}
        textColor={company.textColor} />
      );
    }
    return token;
  }
}

export default CityCircleFactory;
