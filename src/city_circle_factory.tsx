import { List } from 'immutable';
import * as React from 'react';
import { MouseEvent, MouseEventHandler, ReactElement } from 'react';

import CityCircle from './components/city_circle';
import Token from './components/token';

import Company from './company';
import { MapDefinition } from './map_builder';
import Point from './point';

class CityCircleFactory {
  constructor(
    private mapDef: MapDefinition,
    private hex: string,
    private homeTokens: List<string>,
    private onRightClickCity: (hex: string, index: number) => void,
    private onRightClickToken: (
      event: MouseEvent<Element>,
      hex: string,
      index: number
    ) => void,
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
    ReactElement<Token> | undefined {
    let token: ReactElement<Token> | undefined;
    let faded: boolean = false;
    let companyMark: string | undefined;

    const fn: MouseEventHandler<SVGElement> =
      (event: MouseEvent<SVGElement>) => {
      event.preventDefault();
      this.onRightClickToken(event, this.hex, index);
    };

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
        text={company.shorthand}
        onRightClick={fn}
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
