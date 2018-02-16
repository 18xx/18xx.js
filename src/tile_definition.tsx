import { List } from 'immutable';
import { ReactElement } from 'react';

import { DynamicValuesProps } from './components/dynamic_values';
import Tile from './components/tile';

import { MapDefinition } from './map_builder';
import { PointDefinition } from './point';
import TileBuilder from './tile_builder';

export interface TileDefinitionCost {
  readonly amount: number;
  readonly color: string;
  readonly position: PointDefinition;
  readonly shape?: string;
}

export type TileType =
  'City' |
  'DistinctCity' |
  'DoubleOCity' |
  'Town' |
  'UnconnectedCity';

export interface TileDefinitionInput {
  readonly color: string;
  readonly cost?: TileDefinitionCost;
  readonly dynamicValues?: DynamicValuesProps;
  readonly label?: string;
  readonly labelPosition?: number;
  readonly num: string;
  readonly privateReservation?: string;
  readonly numPosition?: number;
  readonly rotations?: number;
  readonly spots?: number;
  readonly spotLocations?: number[];
  readonly track?: number[][];
  readonly trackSpecial?: any; // FIXME: Has special type
  readonly trackToCenter?: number[];
  readonly type?: TileType;
  readonly value?: number;
  readonly valuePosition?: number;
}

class TileDefinition {
  constructor(
    private mapDef: MapDefinition,
    private definition: TileDefinitionInput,
  ) {
  }

  public get color(): string {
    return this.definition.color; }

  public get cost(): TileDefinitionCost | undefined {
    return this.definition.cost;
  }

  public get dynamicValues(): DynamicValuesProps | undefined {
    return this.definition.dynamicValues;
  }

  public get label(): string | undefined {
    return this.definition.label;
  }

  public get labelPosition(): number | undefined {
    return this.definition.labelPosition;
  }

  public get num(): string {
    return this.definition.num;
  }

  public get numPosition(): number | undefined {
    return this.definition.numPosition;
  }

  public get privateReservation(): string | undefined {
    return this.definition.privateReservation;
  }

  public get rotations(): number {
    return this.definition.rotations || 6;
  }

  public get spots(): number | undefined {
    return this.definition.spots;
  }

  public get spotLocations(): number[] | undefined {
    return this.definition.spotLocations;
  }

  public get track(): any {
    return this.definition.track;
  }

  public get trackSpecial(): any { // FIXME: Has specific type
    return this.definition.trackSpecial;
  }

  public get trackToCenter(): any {
    return this.definition.trackToCenter;
  }

  public get type(): TileType | undefined {
    return this.definition.type;
  }

  public get value(): number | undefined {
    return this.definition.value;
  }

  public get valuePosition(): number | undefined {
    return this.definition.valuePosition;
  }

  public get allRotations(): List<ReactElement<Tile>> {
    return List(Array.from(
      new Array(this.rotations), (_: any, i: number) => this.tile(i)
    ));
  }

  public tile(rotation: number): ReactElement<Tile> {
    return new TileBuilder(this.mapDef).buildTile(
      this,
      rotation
    );
  }
}

export default TileDefinition;
