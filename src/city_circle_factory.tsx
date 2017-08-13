import { List } from 'immutable';
import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';

import CityCircle from './components/city_circle';
import TokenInterface from './components/token';

import Token from './containers/token';

import Company from './company';
import { MapDefinition } from './map_builder';
import Point from './point';

class CityCircleFactory {
  constructor(
    private mapDef: MapDefinition,
    private hex: string,
    private homeTokens: List<string>,
    private onRightClickCity: (hex: string, index: number) => void,
    private tokenState: List<string>,
    private radius: number = CityCircle.DEFAULT_RADIUS,
  ) {
  }

  public build(index: number, point: Point): ReactElement<CityCircle> {
    let fn: ((event: MouseEvent<SVGElement>) => void) | undefined;
    if (typeof this.tokenState === 'undefined' || !this.tokenState.get(index)) {
      fn = event => {
        event.preventDefault();
        this.onRightClickCity(this.hex, index);
      };
    }

    return (
      <CityCircle
        hex={this.hex}
        key={point.toString()}
        point={point}
        onContextMenu={fn}
        token={this.buildToken(index, point)}
        radius={this.radius}
      />
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
