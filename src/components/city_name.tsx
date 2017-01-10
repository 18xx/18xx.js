import * as React from 'react';
import { ReactElement } from 'react';

import { MapHexElement } from './map_hex';

import Point from '../point';

interface CityNameProps {
  readonly name: string;
  readonly point: Point;
}

export default class CityName
extends React.Component<CityNameProps, undefined>
implements MapHexElement {

  public render(): ReactElement<CityName> {
    return (
      <text
        textAnchor='middle'
        x={this.props.point.x}
        y={this.props.point.y}>
        {this.props.name}
      </text>
    );
  }
}
