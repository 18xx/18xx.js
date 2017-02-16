import { List } from 'immutable';
import * as React from 'react';
import { MouseEvent, MouseEventHandler, ReactElement } from 'react';

import CityCircle from './components/city_circle';
import Token from './components/token';

import Company from './company';
import Point from './point';

export default class CityCircleFactory {
  constructor(
    private hex: string,
    private homeTokens: List<string>,
    private onRightClickCity: Function,
    private onRightClickToken: Function,
    private tokenState: List<string>,
    private radius: number = CityCircle.DEFAULT_RADIUS,
  ) {
  }

  public build(index: number, point: Point): ReactElement<CityCircle> {
    let fn: Function;
    if (typeof this.tokenState === 'undefined' || !this.tokenState.get(index)) {
      fn = (event: MouseEvent<SVGElement>) => {
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

  private buildToken(index: number, point: Point): ReactElement<Token> {
    let token: ReactElement<Token>;
    let faded: boolean = false;
    let company: Company;

    const fn: MouseEventHandler<SVGElement> =
      (event: MouseEvent<SVGElement>) => {
      event.preventDefault();
      this.onRightClickToken(event, this.hex, index);
    };

    if (this.tokenState.get(index)) {
      company = Company.find(this.tokenState.get(index));
    } else if (this.homeTokens.get(index)) {
      company = Company.find(this.homeTokens.get(index));
      faded = true;
    }

    if (company) {
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
