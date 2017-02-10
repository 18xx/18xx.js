import { List, Map } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import CityCircle, { CityCircleProps } from './components/city_circle';
import CityName from './components/city_name';
import DynamicValues from './components/dynamic_values';
import Game from './components/game';
import MapBoard from './components/map_board';
import MapHex, {
  HEX_BOTTOM, MapHexElement, MapHexProps
} from './components/map_hex';
import OffBoard from './components/off_board';
import PrivateReservation from './components/private_reservation';
import Tile from './components/tile';
import TileCost from './components/tile_cost';
import Token from './components/token';
import Town from './components/town';

import Company from './company';
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
  companies: any;
  dynamicValues: any;
  hexes: any;
  impassable: any;
  names: any;
  offBoards: any;
  preplacedTile: any;
  privateReservations: any;
  tileCostTypes: any;
  tileCosts: any;
  tileManifest: any;
  tilePromotions: TilePromotionTuple[];
  towns?: any;
}

export default class MapBuilder {
  // FIXME: mapDef to interface
  constructor(
    private game: Game,
    private mapDef: MapDefinition,
    private tileSet: TileSet,
  ) {
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
        let fill: string;
        const hexElements: MapHexElement[] = [];
        const hex: string = row + column;

        if (this.mapDef.names[hex]) {
          let y: number = HEX_BOTTOM + 4;
          if (this.mapDef.offBoards[hex]) {
            y -= 20;
          }

          hexElements.push(
            <CityName
              key='city-name'
              point={new Point(Tile.CENTER.x, y)}
              name={this.mapDef.names[hex]} />
          );
        }

        if (this.mapDef.names[hex] && !this.mapDef.offBoards[hex]) {
          let ccProps: CityCircleProps = { point: Tile.CENTER, key: 'cc' };
          const companyStr: string = Map<string, any>(
            this.mapDef.companies
          ).findKey(c => c.home === hex);

          if (companyStr) {
            const company: Company = Company.find(companyStr);
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
          hexElements.push(React.createElement(CityCircle, ccProps));
        }

        if (this.mapDef.towns && this.mapDef.towns[hex]) {
          if (this.mapDef.towns[hex] === 1) {
            hexElements.push(
              <Town points={List<Point>([Tile.CENTER])} key='town' />
            );
          } else {
            const points: List<Point> = List([
              new Point(Tile.CENTER.x - 20, Tile.CENTER.y + 10),
              new Point(Tile.CENTER.x + 20, Tile.CENTER.y - 10),
            ]);
            hexElements.push(
              <Town points={points} key='map-towns' />
            );
          }
        }

        if (this.mapDef.offBoards[hex]) {
          fill = 'red';
          const exits: List<number> = List<number>(
            this.mapDef.offBoards[hex].exits as string[]
          );
          hexElements.push(
            // FIXME: Missing type for offboard exits
            <OffBoard
              key='off-board'
              exits={exits} />
          );
        }

        if (this.mapDef.dynamicValues[hex]) {
          hexElements.push(
            <DynamicValues
              key='dv'
              values={this.mapDef.dynamicValues[hex].values}
              fixedHeight={this.mapDef.dynamicValues[hex].fixedHeight} />
          );
        }

        if (this.mapDef.tileCosts[hex]) {
          hexElements.push(this.assignTileCost(hex));
        }

        let homeTokens: List<string> = List<string>([]);
        const companyStr: string = Map<string, any>(
          this.mapDef.companies
        ).findKey(
          c => c.home === hex
        );

        if (companyStr) {
          homeTokens = List<string>([companyStr]);
        }

        let tile: ReactElement<Tile>;
        const tileBuilder: TileBuilder = new TileBuilder(
          this.game.onRightClickCity,
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
          tile = tileBuilder.buildTile(
            new TileDefinition(this.mapDef.preplacedTile[hex])
          );
        }

        if (this.mapDef.privateReservations[hex]) {
          const name: string = this.mapDef.privateReservations[hex];
          hexElements.push(
            <PrivateReservation key='pcr' name={name} />
          );
        }

        hexData.push({
          row,
          column,
          fill,
          tile,
          elements: List(hexElements)
        });
      }
    }

    return this.renderHexes(hexData);
  }

  public get addOnTop(): List<ReactElement<any>> {
    if (this.mapDef.impassable) {
      return List<ReactElement<any>>(this.mapDef.impassable.map(
        (hexes: [string, string]) => {
          const hex0: MapHex = new MapHex({
            column: parseInt(hexes[0].substring(1), 10),
            row: (hexes[0].substring(0, 1)),
          });

          const hex1: MapHex = new MapHex({
            column: parseInt(hexes[1].substring(1), 10),
            row: (hexes[1].substring(0, 1)),
          });

          let x1: number;
          let x2: number;
          if (hex0.absoluteCenter.y === hex1.absoluteCenter.y) {
            x1 = x2 = (hex0.absoluteCenter.x + hex1.absoluteCenter.x) / 2;
          } else {
            x1 = hex1.absoluteCenter.x;
            x2 = hex0.absoluteCenter.x;
          }

          let y1: number;
          if (hex0.absoluteCenter.y > hex1.absoluteCenter.y) {
            y1 = Tile.SIDE_LENGTH / -2;
          } else {
            y1 = Tile.SIDE_LENGTH / 2;
          }
          const y2: number = -y1;

          return (
            <line
            key={`impassable-${hexes.join('-')}`}
            x1={x1}
            y1={hex0.absoluteCenter.y + y1}
            x2={x2}
            y2={hex1.absoluteCenter.y + y2}
            strokeWidth={4}
            stroke='red' />
          );
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
      key='tile-cost'
      shape={costs.shape} />
    );
  }

  // FIXME: Typedef
  private renderHexes(hexData: MapHexProps[]): List<ReactElement<MapHex>> {
    return List(hexData.map(data =>
      <MapHex
        key={data.row + data.column}
        row={data.row}
        column={data.column}
        fill={data.fill}
        tile={data.tile}
        elements={List(data.elements)}
        onHexClick={this.game.onHexClick}
      />
    ));
  }
}
