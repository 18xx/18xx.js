import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import CityCircle from './city_circle';
import Tile from './tile';
import Value from './value';

import Hexagon from '../hexagon';
import { MapDefinition} from '../map_builder';
import Point from '../point';

export interface MapHexProps {
  readonly allowTile?: boolean;
  readonly column: number;
  readonly elements?: List<MapHexElement>;
  readonly fill?: string;
  readonly onHexClick?: (mapHex: MapHex) => void;
  readonly mapDef: MapDefinition;
  readonly row: string;
  readonly tile?: ReactElement<Tile>;
}

export interface MapHexElement {
  toString(): string;
}

class MapHex extends React.Component<MapHexProps, {}> {

  public static defaultProps: Partial<MapHexProps> = {
    allowTile: true,
    elements: List([]),
    fill: '#efe',
  };

  private hexagon: Hexagon;

  constructor(props: MapHexProps) {
    super(props);
    this.hexagon = new Hexagon(props.mapDef.orientation);
  }

  get row(): string {
    return this.props.row;
  }

  get column(): number {
    return this.props.column;
  }

  get absoluteLeft(): number {
    let result: number = (this.column - 1) * this.hexagon.width;
    if (this.props.mapDef.orientation === 'north-south') {
      result *= 0.75;
    } else {
      result *= 0.5;
    }
    return result;
  }

  get absoluteTop(): number {
    const keyIndex: number = Object.keys(this.props.mapDef.hexes).indexOf(
      this.row
    );
    if (keyIndex === -1) {
      throw new Error('Could not find index for: ' + this.row);
    }
    let result: number = keyIndex * this.hexagon.height;

    if (this.props.mapDef.orientation === 'north-south') {
      result *= 0.5;
    } else {
      result *= 0.75;
    }
    return result;
  }

  get absoluteCenter(): Point {
    return new Point(
      this.absoluteLeft + this.hexagon.width / 2,
      this.absoluteTop + this.hexagon.height / 2,
    );
  }

  get hex(): string {
    return `${this.row}${this.column}`;
  }

  public render(): ReactElement<MapHex> {
    return (
      <svg
        x={this.absoluteLeft}
        y={this.absoluteTop}
        className='hex'
        onClick={ () => this.props.onHexClick(this) }>
        <polygon
          points={this.hexagon.hexPoints().join(' ')}
          fill={this.props.fill}
          stroke='black'/>

        {this.props.elements}
        {this.props.tile}
      </svg>
    );
  }
}

export default MapHex;
