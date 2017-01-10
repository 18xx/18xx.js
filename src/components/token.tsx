import * as React from 'react';
import { ReactElement } from 'react';

import CityCircle from './city_circle';

interface TokenProps {
  readonly faded?: boolean;
  readonly text: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly textColor: string;
}

export default class Token
extends React.Component<TokenProps, undefined> {
  public static defaultProps: any;

  public render(): ReactElement<Token> {
    return (
      <svg opacity={this.opacity} width='40' height='40' key={this.props.text}>
        <circle
          cx={CityCircle.RADIUS + CityCircle.STROKE_WIDTH / 2}
          cy={CityCircle.RADIUS + CityCircle.STROKE_WIDTH / 2}
          r={CityCircle.RADIUS - 3}
          fill={this.props.primaryColor}
        />

        <rect
          x={4}
          y={CityCircle.RADIUS - 5}
          width={32}
          height={12}
          fill={this.props.secondaryColor}
          rx={1.75}
          ry={12}
        />

        <text
          textAnchor='middle'
          x={CityCircle.RADIUS + 1}
          y={CityCircle.RADIUS + 5}
          fontSize={10}
          stroke='none'
          fill={this.props.textColor}>

          {this.props.text}
        </text>
      </svg>
    );
  }

  private get opacity(): number {
    let result: number = 1.0;
    if (this.props.faded) {
      result = 0.3;
    }
    return result;
  }
}

Token.defaultProps = {
  faded: false,
};
