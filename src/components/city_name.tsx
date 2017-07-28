import * as React from 'react';
import { Component, ReactElement } from 'react';

import { MapHexElement } from './map_hex';

import Point from '../point';

interface CityNameProps {
  readonly name: string;
  readonly point: Point;
}

class CityName extends Component<CityNameProps, {}> implements MapHexElement {
  public render(): ReactElement<CityName> {
    return (
      <text
        textAnchor='middle'
        fontSize={this.fontSize}
        x={this.props.point.x}
        y={this.textY}>
        {this.props.name}
      </text>
    );
  }

  private get fontSize(): number {
    let result: number = 16;
    if (this.props.name.length > 12) {
      result = 12;
    }
    return result;
  }

  private get textY(): number {
    return this.props.point.y - 16 + this.fontSize;
  }
}

export default CityName;
