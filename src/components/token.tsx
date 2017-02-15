import * as React from 'react';
import { MouseEventHandler, ReactElement } from 'react';

import CityCircle from './city_circle';

interface TokenProps {
  readonly faded?: boolean;
  readonly onRightClick?: MouseEventHandler<SVGElement>;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly radius?: number;
  readonly text: string;
  readonly textColor: string;
}

export default class Token
extends React.Component<TokenProps, undefined> {
  public static defaultProps: Partial<TokenProps> = {
    faded: false,
    radius: CityCircle.DEFAULT_RADIUS,
  };

  public render(): ReactElement<Token> {
    return (
      <svg
      onContextMenu={this.props.onRightClick}
      opacity={this.opacity}
      width='40'
      height='40'
      key={this.props.text}>
        <circle
          cx={this.props.radius + CityCircle.STROKE_WIDTH / 2}
          cy={this.props.radius + CityCircle.STROKE_WIDTH / 2}
          r={this.props.radius - 3}
          fill={this.props.primaryColor}
        />

        <rect
          x={4}
          y={this.props.radius - 5}
          width={this.props.radius * 2 - 6}
          height={12}
          fill={this.props.secondaryColor}
          rx={1.75}
          ry={12}
        />

        <text
          textAnchor='middle'
          x={this.props.radius + 1}
          y={this.textY}
          fontSize={this.fontSize}
          fontWeight={this.fontWeight}
          stroke='none'
          fill={this.props.textColor}>

          {this.props.text}
        </text>
      </svg>
    );
  }

  private get isNumber(): boolean {
    return !isNaN(parseInt(this.props.text, 10));
  }

  private get textY(): number {
    let result: number = this.props.radius + 5;
    if (this.isNumber) {
      result += 4;
    }
    return result;
  }

  private get fontSize(): number {
    let result: number = 10;
    if (this.isNumber) {
      result = 26;
    }
    return result;
  }

  private get fontWeight(): string {
    let result: string = 'normal';
    if (this.isNumber) {
      result = 'bold';
    }
    return result;
  }

  private get opacity(): number {
    let result: number = 1.0;
    if (this.props.faded) {
      result = 0.3;
    }
    return result;
  }
}
