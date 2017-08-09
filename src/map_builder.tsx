import { List, Map } from 'immutable';
import * as _ from 'lodash';
import * as React from 'react';
import { ReactElement } from 'react';

import CityCircle, { CityCircleProps } from './components/city_circle';
import CityName from './components/city_name';
import DynamicValues from './components/dynamic_values';
import GameInterface from './components/game_interface';
import MapHex, {
  MapHexElement, MapHexProps
} from './components/map_hex';
import MediumCity from './components/medium_city';
import OffBoard from './components/off_board';
import PrivateReservation from './components/private_reservation';
import Tile from './components/tile';
import TileCost from './components/tile_cost';
import Token from './components/token';
import Town from './components/town';

import CityCircleFactory from './city_circle_factory';
import Company from './company';
import Hexagon from './hexagon';
import Point from './point';
import TileBuilder from './tile_builder';
import TileDefinition from './tile_definition';
import TileSet from './tile_set';

export interface TilePromotionTuple {
  readonly hexes: List<string> | null;
  readonly promotions: List<string>;
}

// FIXME: Use proper attributes
export interface MapDefinition {
  cities?: any;
  companies: any;
  costLocation?: any;
  dynamicValues?: any;
  hexes?: any;
  impassable?: any;
  invertHexes?: boolean;
  mediumCities?: any;
  names?: any;
  offBoards?: any;
  orientation?: string;
  preplacedTile?: any;
  privateReservations?: any;
  tileCostTypes?: any;
  tileCosts?: any;
  tileManifest: any;
  tilePromotions?: TilePromotionTuple[];
  towns?: any;
}

class MapBuilder {
  private hexagon: Hexagon;

  constructor(
    private gameInterface: GameInterface,
    private mapDef: MapDefinition,
    private tileSet: TileSet,
  ) {
    this.hexagon = new Hexagon(mapDef.orientation);
  }

  // FIXME state is not any, and it doesn't need the whole state
  public getHexes(
    tileState: Map<string, string>,
    tokenState: Map<string, List<string>>,
  ): List<ReactElement<MapHex>> {
    const keys: string[] = Object.keys(this.mapDef.hexes);
    // FIXME: hexData to interface
    const hexData: MapHexProps[] = [];

    for (const row of keys) {
      const columns: number[] = this.mapDef.hexes[row];

      for (const column of columns) {
        let fill: string | undefined;
        let allowTile: boolean = true;
        const hexElements: MapHexElement[] = [];
        const hex: string = row + column;

        if (this.mapDef.names[hex]) {
          let y: number = 100;
          if (this.mapDef.offBoards && this.mapDef.offBoards[hex]) {
            y -= 20;
          }
          if (this.hexagon.orientation === 'north-south') {
            y -= 6;
          }

          hexElements.push(
            <CityName
              key='city-name'
              point={new Point(this.hexagon.center.x, y)}
              name={this.mapDef.names[hex]} />
          );
        }

        if (this.mapDef.cities && this.mapDef.cities[hex]) {
          let ccProps: CityCircleProps = {
            key: 'cc',
            point: this.hexagon.center,
          };
          const companyStr: string = Map<string, any>(
            this.mapDef.companies
          ).findKey(c => c.home === hex);

          if (companyStr) {
            const company: Company = Company.fromJson(
              companyStr,
              this.mapDef.companies[companyStr]
            );
            const token: ReactElement<Token> = (
              <Token
              faded={true}
              text={company.shorthand}
              primaryColor={company.primaryColor}
              secondaryColor={company.secondaryColor}
              textColor={company.textColor} />
            );
            ccProps = {
              ...ccProps,
              token
            };
          }
          if (this.mapDef.cities[hex] === 1) {
            hexElements.push(React.createElement(CityCircle, ccProps));
          } else {
            hexElements.push(
              React.createElement(
                CityCircle,
                {
                  ...ccProps,
                  key: 'cc1',
                  point: new Point(
                    this.hexagon.center.x - 25,
                    this.hexagon.center.y
                  ),
                },
              ),
              React.createElement(
                CityCircle,
                {
                  ...ccProps,
                  key: 'cc2',
                  point: new Point(
                    this.hexagon.center.x + 25,
                    this.hexagon.center.y
                  ),
                  token: undefined
                },
              ),
            );
          }
        }

        if (this.mapDef.towns && this.mapDef.towns[hex]) {
          if (this.mapDef.towns[hex] === 1) {
            hexElements.push(
              <Town points={List<Point>([this.hexagon.center])} key='town' />
            );
          } else {
            const points: List<Point> = List([
              new Point(this.hexagon.center.x - 20, this.hexagon.center.y + 10),
              new Point(this.hexagon.center.x + 20, this.hexagon.center.y - 10),
            ]);
            hexElements.push(
              <Town points={points} key='map-towns' />
            );
          }
        }

        if (this.mapDef.mediumCities && this.mapDef.mediumCities[hex]) {
          if (this.mapDef.mediumCities[hex] === 1) {
            hexElements.push(
              <MediumCity
              points={List<Point>([this.hexagon.center])}
              key='town' />
            );
          } else {
            const points: List<Point> = List([
              new Point(this.hexagon.center.x - 20, this.hexagon.center.y + 10),
              new Point(this.hexagon.center.x + 20, this.hexagon.center.y - 10),
            ]);
            hexElements.push(
              <MediumCity points={points} key='map-mediumCities' />
            );
          }
        }

        let homeTokens: List<string> = List<string>([]);
        Object.keys(this.mapDef.companies).forEach(key => {
          const company: any = this.mapDef.companies[key];
          if (company.home === hex) {
            homeTokens = (company.index || company.index === 0) ?
              homeTokens.set(company.index, key) :
              homeTokens.push(key);
          }
        });

        if (this.mapDef.offBoards && this.mapDef.offBoards[hex]) {
          fill = this.mapDef.offBoards[hex].color || 'red';
          allowTile = false;
          const exits: List<number> = List<number>(
            this.mapDef.offBoards[hex].exits as string[]
          );
          hexElements.push(
            // FIXME: Missing type for offboard exits
            <OffBoard
              key='off-board'
              hexagon={this.hexagon}
              exits={exits} />
          );

          if (this.mapDef.offBoards[hex].spots > 0) {
            const point: Point = new Point(
              this.hexagon.center.x,
              this.hexagon.height * 2 / 3
            );

            const factory: CityCircleFactory = new CityCircleFactory(
              this.mapDef,
              hex,
              homeTokens,
              this.gameInterface.onRightClickCity,
              this.gameInterface.onRightClickToken,
              tokenState.get(hex) || List([]),
            );

            hexElements.push(
              factory.build(0, point)
            );
          }
        }

        if (this.mapDef.dynamicValues && this.mapDef.dynamicValues[hex]) {
          hexElements.push(
            <DynamicValues
              key='dv'
              hexagon={this.hexagon}
              values={this.mapDef.dynamicValues[hex].values}
              fixedHeight={this.mapDef.dynamicValues[hex].fixedHeight} />
          );
        }

        if (this.mapDef.tileCosts[hex]) {
          hexElements.push(this.assignTileCost(hex));
        }

        let tile: ReactElement<Tile> | undefined;
        const tileBuilder: TileBuilder = new TileBuilder(
          this.mapDef,
          this.gameInterface.onRightClickCity,
          this.gameInterface.onRightClickToken,
          hex,
          tokenState.get(hex),
          homeTokens,
        );

        if (tileState.has(hex)) {
          const tileStr: string[] = tileState.get(hex).split('.');
          tile = tileBuilder.buildTile(
            this.tileSet.findDefinition(tileStr[0]),
            parseInt(tileStr[1], 10)
          );
        } else if (this.mapDef.preplacedTile[hex]) {
          allowTile = _.includes(
            _.flatMap(this.mapDef.tilePromotions, set => set.hexes),
            hex
          );
          tile = tileBuilder.buildTile(
            new TileDefinition(
              this.mapDef,
              this.mapDef.preplacedTile[hex],
            )
          );
        }

        if (
          this.mapDef.privateReservations &&
          this.mapDef.privateReservations[hex]
        ) {
          const name: string = this.mapDef.privateReservations[hex];
          hexElements.push(
            <PrivateReservation key='pcr' hexagon={this.hexagon} name={name} />
          );
        }

        hexData.push({
          allowTile,
          column,
          elements: List(hexElements),
          fill,
          mapDef: this.mapDef,
          row,
          tile,
        });
      }
    }

    return this.renderHexes(hexData);
  }

  public get addOnTop(): List<ReactElement<any>> | undefined {
    if (this.mapDef.impassable) {
      return List<ReactElement<any>>(this.mapDef.impassable.map(
        (hexes: [string, string]) => {
          const hex0: MapHex = new MapHex({
            column: parseInt(hexes[0].substring(1), 10),
            mapDef: this.mapDef,
            row: (hexes[0].substring(0, 1)),
          });

          const hex1: MapHex = new MapHex({
            column: parseInt(hexes[1].substring(1), 10),
            mapDef: this.mapDef,
            row: (hexes[1].substring(0, 1)),
          });

          if (this.mapDef.orientation === 'north-south') {
            const data: number[] = this.midpointLinePoints(
              hex0.absoluteCenter.x,
              hex1.absoluteCenter.x,
              hex0.absoluteCenter.y,
              hex1.absoluteCenter.y,
            );

            return (
              <line
              key={`impassable-${hexes.join('-')}`}
              x1={hex0.absoluteCenter.x + data[0]}
              y1={data[2]}
              x2={hex1.absoluteCenter.x + data[1]}
              y2={data[3]}
              strokeWidth={4}
              stroke='red' />
            );
          } else {
            const data: number[] = this.midpointLinePoints(
              hex0.absoluteCenter.y,
              hex1.absoluteCenter.y,
              hex0.absoluteCenter.x,
              hex1.absoluteCenter.x,
            );

            return (
              <line
              key={`impassable-${hexes.join('-')}`}
              x1={data[2]}
              y1={hex0.absoluteCenter.y + data[0]}
              x2={data[3]}
              y2={hex1.absoluteCenter.y + data[1]}
              strokeWidth={4}
              stroke='red' />
            );
          }
        }
      ));
    }
  }

  private assignTileCost(hex: string): ReactElement<TileCost> {
    // FIXME interface
    const type: any = this.mapDef.tileCosts[hex];
    // FIXME interface
    const costs: any = this.mapDef.tileCostTypes[type];

    return (
      <TileCost
      amount={costs.amount}
      color={costs.color}
      hexagon={this.hexagon}
      key='tile-cost'
      shape={costs.shape} />
    );
  }

  // FIXME: Typedef
  private renderHexes(hexData: MapHexProps[]): List<ReactElement<MapHex>> {
    return List(hexData.map((data: MapHexProps) =>
      <MapHex
        key={data.row + data.column}
        row={data.row}
        column={data.column}
        fill={data.fill}
        tile={data.tile}
        elements={data.elements}
        allowTile={data.allowTile}
        onHexClick={this.gameInterface.onHexClick}
        mapDef={this.mapDef}
      />
    ));
  }

  private midpointLinePoints(
    a: number,
    b: number,
    c: number,
    d: number,
  ): number[] {
    let y1: number;
    let y2: number;
    if (a === b) {
      y1 = y2 = (c + d) / 2;
    } else {
      y1 = d;
      y2 = c;
    }

    const x1: number = (a > b) ? Tile.SIDE_LENGTH / -2 : Tile.SIDE_LENGTH / 2;
    const x2: number = -x1;

    return [x1, x2, y1, y2];
  }
}

export default MapBuilder;
