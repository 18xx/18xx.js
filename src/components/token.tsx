import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';

import CityCircle from './city_circle';

export interface TokenInitProps {
  readonly faded?: boolean;
  readonly hex?: string;
  readonly index?: number;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly radius?: number;
  readonly text: string;
  readonly textColor: string;
}

export interface TokenMappedProps {
  readonly onRightClick?: (hex: string, index: number) => void;
}

export type TokenProps = TokenInitProps & TokenMappedProps;

class Token extends React.Component<TokenProps, {}> {
  public static defaultProps: Partial<TokenProps> = {
    faded: false,
    radius: CityCircle.DEFAULT_RADIUS,
  };

  public render(): ReactElement<Token> {
    const fn: (event: MouseEvent<SVGElement>) => void = event => {
      event.preventDefault();
      if (
        this.props.hex &&
        this.props.index !== undefined &&
        this.props.onRightClick
      ) {
        this.props.onRightClick(this.props.hex, this.props.index);
      }
    };

    return (
      <svg
      onContextMenu={fn}
      opacity={this.opacity}
      viewBox='0 0 40 40'
      width='40'
      height='40'
      className='token'
      key={this.props.text}>
        <circle
          cx={this.radius + CityCircle.STROKE_WIDTH / 2}
          cy={this.radius + CityCircle.STROKE_WIDTH / 2}
          r={this.radius - 3}
          fill={this.props.primaryColor}
        />

        <rect
          x={4}
          y={this.radius - 5}
          width={this.radius * 2 - 6}
          height={12}
          fill={this.props.secondaryColor}
          rx={1.75}
          ry={12}
        />

        <text
          textAnchor='middle'
          x={this.radius + 1}
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
    let result: number = this.radius + 5;
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

  private get radius(): number {
    // Radius is provided by default props if not available
    return this.props.radius!;
  }
}

export default Token;
