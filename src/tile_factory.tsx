import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

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

import Point from './point';
import TileDefinition from './tile_definition';
import Track from './track';
import TrackSpecial from './track_special';
import TrackToCenter from './track_to_center';

export default class TileFactory {
  constructor(
    private onRightClickCity: Function,
    private definition: TileDefinition,
    private rotation: number = 0,
    private hex?: string,
  ) {
  }

  public city(
    tokenState: List<string>, homeTokens: List<string>
  ): ReactElement<Station> {
    const attributes: any = { // FIXME: should be CityProps
      hex: this.hex,
      key: this.hex || 'city',
      num: this.definition.spots,
      onRightClickCity: this.onRightClickCity,
      tokenState,
      homeTokens,
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
        klass = DoubleOCity;
        const midpoints: List<List<Point>> = this.track.map(track => {
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
          result = List(combinations.maxBy(set => Math.sqrt(
            Math.pow(set.get(1).x - set.get(0).x, 2) +
            Math.pow(set.get(1).y - set.get(0).y, 2)
          )));
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
            track => track.midpoints(midpointPosition).get(0)
          ).toList();
        } else {
          attributes.points = [Tile.CENTER];
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

  public get dynamicValues(): ReactElement<DynamicValues> {
    if (this.definition.dynamicValues) {
      return (
        <DynamicValues
        key='dv'
        values={this.definition.dynamicValues.values}
        fixedHeight={this.definition.dynamicValues.fixedHeight} />
      );
    }
  }

  public get label(): ReactElement<Label> {
    if (this.definition.label) {
      let point: Point;

      if (this.definition.labelPosition) {
        point = this.pointPosition(
          this.definition.labelPosition,
          12
        );
      }

      return (
        <Label key='label' labelStr={this.definition.label} point={point} />
      );
    }
  }

  public get privateReservation(): ReactElement<PrivateReservation> {
    if (this.definition.privateReservation) {
      const name: string = this.definition.privateReservation;
      return (
        <PrivateReservation key='pcr' name={name} />
      );
    }
  }

  public get tileCost(): ReactElement<TileCost> {
    if (this.definition.cost) {
      let point: Point;
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
          key='tile-cost'
          location={point} />
      );
    }
  }

  public get tileNumber(): ReactElement<TileNumber> {
    if (this.definition.num) {
      let orientation: number;
      let position: Point;

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
          point={position} />
      );
    }
  }

  public get track(): List<Track> {
    if (this.definition.track) {
      return List(
        this.definition.track.map((trackValues: [number, number]) =>
          new Track(
            (trackValues[0] + this.rotation) % 6,
            (trackValues[1] + this.rotation) % 6,
          )
        )
      );
    }
  }

  public get trackSpecial(): List<TrackSpecial> {
    if (this.definition.trackSpecial) {
      return List<TrackSpecial>(
        // FIXME: Only works for bypass
        this.definition.trackSpecial.bypass.map(
          (trackValues: [number, number]) =>
            new TrackSpecial(
              (trackValues[0] + this.rotation) % 6,
              (trackValues[1] + this.rotation) % 6,
            )
        )
      );
    }
  }

  public get trackToCenter(): List<TrackToCenter> {
    if (this.definition.trackToCenter) {
      return List(
        this.definition.trackToCenter.map((value: number) =>
          new TrackToCenter((value + this.rotation) % 6)
        )
      );
    }
  }

  public get value(): ReactElement<Value> {
    let position: Point = Value.defaultProps.position;
    if (this.definition.type === 'DistinctCity') {
      position = Tile.CENTER;
    }

    if (this.definition.valuePosition) {
      position = this.pointPosition(
        this.definition.valuePosition,
        0,
        Tile.HEIGHT / 2 - 14
      );
    }

    if (this.definition.value) {
      return (
        <Value key='value' amount={this.definition.value} position={position} />
      );
    }
  }

  private pointPosition(
    radians: number,
    adjustY: number = 0,
    distance: number = null,
  ): Point {
    if (!distance) {
      distance = Tile.HEIGHT / 2 - 2;
    }
    const startPoint: Point = Point.fromCenter(
      radians + this.rotation,
      distance
    );
    const x: number = startPoint.x;
    let y: number = startPoint.y;

    if (y < Tile.CENTER.y) {
      y += adjustY;
    }

    if (startPoint.isAtCenterX()) {
      if (y < Tile.CENTER.y) {
        y += adjustY * 2 / 3;
      } else {
        y -= adjustY * 2 / 3;
      }
    }

    return new Point(x, y);
  }
}
