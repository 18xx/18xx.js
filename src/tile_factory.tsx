import { List, Map } from 'immutable';
import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';

import City, { CityProps, Station } from './components/city';
import DistinctCity from './components/distinct_city';
import DoubleOCity from './components/double_o_city';
import DynamicValues from './components/dynamic_values';
import Label from './components/label';
import PrivateReservation from './components/private_reservation';
import Tile, { TileElement } from './components/tile';
import TileCost from './components/tile_cost';
import TileNumber from './components/tile_number';
import Town from './components/town';
import UnconnectedCity from './components/unconnected_city';
import Value from './components/value';

import Hexagon from './hexagon';
import { MapDefinition } from './map_builder';
import Point from './point';
import TileDefinition from './tile_definition';
import Track from './track';
import TrackSpecial from './track_special';
import TrackToCenter from './track_to_center';

class TileFactory {
  private hexagon: Hexagon;

  constructor(
    private mapDef: MapDefinition,
    private onRightClickCity:
      ((hex: string, index: number) => void) | undefined,
    private onRightClickToken: ((
      event: MouseEvent<Element>,
      hex: string,
      index: number
    ) => void) | undefined,
    private definition: TileDefinition,
    private rotation: number = 0,
    private hex?: string,
  ) {
    this.hexagon = new Hexagon(this.orientation);
  }

  public city(
    tokenState: List<string> | undefined, homeTokens: List<string> | undefined
  ): ReactElement<Station> | undefined {
    const attributes: any = { // FIXME: should be CityProps
      hex: this.hex,
      hexagon: this.hexagon,
      homeTokens,
      key: this.hex || 'city',
      mapDef: this.mapDef,
      num: this.definition.spots,
      onRightClickCity: this.onRightClickCity,
      onRightClickToken: this.onRightClickToken,
      tokenState,
    };
    let klass: any;

    switch (this.definition.type) {
      case 'City':
        klass = City;
        break;
      case 'UnconnectedCity':
        klass = UnconnectedCity;
        break;
      case 'DistinctCity':
        klass = DistinctCity;
        attributes.spotLocations = this.definition.spotLocations;
        attributes.rotation = this.rotation;
        break;
      case 'DoubleOCity':
        if (!this.track) {
          return;
        }

        klass = DoubleOCity;
        const midpoints: List<List<Point>> = this.track.map((track: Track) => {
          let numMidpoints: number = 4;
          if (track.isTightCurve()) {
            numMidpoints = 1;
          } else if (track.isShallowCurve()) {
            numMidpoints = 3;
          }
          return track.midpoints(numMidpoints);
        }).toList();

        // Determine the two points which are furthest way for the Double O
        // to avoid overlap
        let result: List<Point>;
        if (this.track.size === 1) {
          result = List([midpoints.first().first()]);
        } else if (this.track.size === 2) {
          const combinations: List<List<Point>> = List([
            List([midpoints.first().first(), midpoints.last().first()]),
            List([midpoints.first().first(), midpoints.last().last()]),
            List([midpoints.first().last(), midpoints.last().first()]),
            List([midpoints.first().last(), midpoints.last().last()]),
          ]);
          result = List(combinations.maxBy((set: List<Point>) => Math.sqrt(
            Math.pow(set.get(1).x - set.get(0).x, 2) +
            Math.pow(set.get(1).y - set.get(0).y, 2)
          )));
        } else {
          throw new Error('Unsupported number of track');
        }

        attributes.points = result;
        break;
      case 'Town':
        klass = Town;
        attributes.borderColor = Tile.modifiedHexColor(this.definition.color);
        if (this.track) {
          let midpointPosition: number = 3;
          if (this.track.size === 1) {
            midpointPosition = 1;
          }
          attributes.points = this.track.map(
            (track: Track) => track.midpoints(midpointPosition).get(0)
          ).toList();
        } else {
          attributes.points = [this.hexagon.center];
        }
        break;
      default:
    }

    if (klass) {
      return React.createElement<Station>(
        klass,
        attributes
      );
    }
  }

  public get dynamicValues(): ReactElement<DynamicValues> | undefined {
    if (this.definition.dynamicValues) {
      return (
        <DynamicValues
        key='dv'
        hexagon={this.hexagon}
        values={this.definition.dynamicValues.values}
        fixedHeight={this.definition.dynamicValues.fixedHeight} />
      );
    }
  }

  public get label(): ReactElement<Label> | undefined {
    if (this.definition.label) {
      let point: Point | undefined;

      if (this.definition.labelPosition) {
        point = this.pointPosition(
          this.definition.labelPosition,
          12
        );
      }

      return (
        <Label
        key='label'
        labelStr={this.definition.label}
        hexagon={this.hexagon}
        point={point} />
      );
    }
  }

  public get privateReservation():
    ReactElement<PrivateReservation> | undefined {
    if (this.definition.privateReservation) {
      const name: string = this.definition.privateReservation;
      return (
        <PrivateReservation key='pcr' hexagon={this.hexagon} name={name} />
      );
    }
  }

  public get tileCost(): ReactElement<TileCost> | undefined {
    if (this.definition.cost) {
      let point: Point | undefined;
      if (this.definition.cost.position) {
        point = new Point(
          this.definition.cost.position.x,
          this.definition.cost.position.y
        );
      }

      return (
        <TileCost
          amount={this.definition.cost.amount}
          color={this.definition.cost.color}
          hexagon={this.hexagon}
          key='tile-cost'
          shape={this.definition.cost.shape}
          location={point} />
      );
    }
  }

  public get tileNumber(): ReactElement<TileNumber> | undefined {
    if (this.definition.num) {
      let orientation: number | undefined;
      let position: Point | undefined;

      if (this.definition.rotations !== 1) {
        orientation = this.rotation;
      }

      if (this.definition.numPosition) {
        position = this.pointPosition(
          this.definition.numPosition,
          6
        );
      }

      return (
        <TileNumber
          key='tile-number'
          num={this.definition.num}
          orientation={orientation}
          hexagon={this.hexagon}
          point={position} />
      );
    }
  }

  public get track(): List<Track> | undefined {
    if (this.definition.track) {
      let result: List<Track>;
      if (Array.isArray(this.definition.track)) {
        result = List(
          this.definition.track.map((trackValues: [number, number]) =>
            new Track(
              (trackValues[0] + this.rotation) % 6,
              (trackValues[1] + this.rotation) % 6,
              new Hexagon(this.orientation),
            )
          )
        );
      } else {
        result = List(Object.keys(this.definition.track)).flatMap(
          (gague: string) => this.definition.track[gague].map(
            (trackValues: [number, number]) =>
              new Track(
                (trackValues[0] + this.rotation) % 6,
                (trackValues[1] + this.rotation) % 6,
                new Hexagon(this.orientation),
                gague,
              )
          )
        ) as List<Track>;
      }
      return result;
    }
  }

  public get trackSpecial(): List<TrackSpecial> | undefined {
    if (this.definition.trackSpecial) {
      return List<TrackSpecial>(
        // FIXME: Only works for bypass
        this.definition.trackSpecial.bypass.map(
          (trackValues: [number, number]) =>
            new TrackSpecial(
              (trackValues[0] + this.rotation) % 6,
              (trackValues[1] + this.rotation) % 6,
              new Hexagon(this.orientation),
            )
        )
      );
    }
  }

  public get trackToCenter(): List<TrackToCenter> | undefined {
    if (this.definition.trackToCenter) {
      let result: List<TrackToCenter>;
      if (Array.isArray(this.definition.trackToCenter)) {
        result = List(
          this.definition.trackToCenter.map((value: number) =>
            new TrackToCenter(
              (value + this.rotation) % 6,
              new Hexagon(this.orientation),
            )
          )
        );
      } else {
        result = List(
          Object.keys(this.definition.trackToCenter)
        ).flatMap((gague: string) =>
          this.definition.trackToCenter[gague].map((value: number) =>
            new TrackToCenter(
              (value + this.rotation) % 6,
              new Hexagon(this.orientation),
              gague
            )
          )
        ) as List<TrackToCenter>;
      }
      return result;
    }
  }

  public get value(): ReactElement<Value> | undefined {
    let position: Point | undefined;
    if (this.definition.type === 'DistinctCity') {
      position = this.hexagon.center;
    }

    if (this.definition.valuePosition) {
      position = this.pointPosition(
        this.definition.valuePosition,
        0,
        Tile.HEIGHT / 2 - 14
      );
    } else if (this.definition.valuePosition === null) {
      position = this.hexagon.center;
    }

    if (this.definition.value) {
      return (
        <Value
        key='value'
        amount={this.definition.value}
        hexagon={this.hexagon}
        position={position} />
      );
    }
  }

  private pointPosition(
    radians: number,
    adjustY: number = 0,
    distance: number = 0,
  ): Point {
    if (!distance) {
      distance = Tile.HEIGHT / 2 - 2;
    }
    const startPoint: Point = Point.from(
      this.hexagon.center,
      radians + this.rotation + this.hexagon.offset,
      distance
    );
    const x: number = startPoint.x;
    let y: number = startPoint.y;

    if (y < this.hexagon.center.y) {
      y += adjustY;
    }

    if (startPoint.isAtCenterX()) {
      if (y < this.hexagon.center.y) {
        y += adjustY * 2 / 3;
      } else {
        y -= adjustY * 2 / 3;
      }
    }

    return new Point(x, y);
  }

  private get orientation(): string {
    return this.mapDef.orientation || 'east-west';
  }
}

export default TileFactory;
