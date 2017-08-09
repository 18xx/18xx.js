import * as Immutable from 'immutable';
import { List, Map } from 'immutable';
import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';
import { Store } from 'redux';

import * as allTilesJson from '../../config/tiles.json';

import AvailableTiles from './available_tiles';
import AvailableTokens from './available_tokens';
import EditToken from './edit_token';
import History from './history';
import MapBoard from './map_board';
import MapHex from './map_hex';
import Tile from './tile';

import { GameState } from '../reducers/game';

import Company from '../company';
import MapBuilder, { MapDefinition, TilePromotionTuple } from '../map_builder';
import { TileDefinitionInput } from '../tile_definition';
import TileSet, { TileSetDetails } from '../tile_set';

const allTiles: List<TileDefinitionInput> =
  Immutable.fromJS(allTilesJson).map(
    (el: any) => el.toJS() as TileDefinitionInput
  );

export interface GameInterfaceProps {
  readonly gameName: string;
  readonly mapDef: MapDefinition;
  readonly store: Store<GameState>;
}

class GameInterface
  extends React.Component<GameInterfaceProps, GameState> {

  public readonly tileSet: TileSet;
  private mapBuilder: MapBuilder;

  constructor(props: GameInterfaceProps) {
    super(props);

    this.state = props.store.getState();
    this.store.subscribe(() =>
      this.setState(props.store.getState())
    );

    this.tileSet = new TileSet(
      allTiles,
      props.mapDef,
      Map<string, TileSetDetails>(props.mapDef.tileManifest)
    );

    this.mapBuilder = new MapBuilder(
      this,
      this.props.mapDef,
      this.tileSet
    );
  }

  public render(): ReactElement<GameInterface> | null {
    let topMenu: ReactElement<any> | undefined;

    switch (this.state.openMenu) {
      case 'TILE':
        topMenu = (
          <AvailableTiles
            show={true}
            tileFilter={this.state.tileFilter}
            onClick={this.placeTile}
            tiles={this.state.tiles}
            tileSet={this.tileSet} />
        );
        break;
      case 'TOKEN':
        const companies: List<Company> = List<Company>(
          Object.keys(this.props.mapDef.companies).map(
            (reportingMark: string) => Company.fromJson(
              reportingMark,
              this.props.mapDef.companies[reportingMark]
            )
          )
        );
        topMenu = (
          <AvailableTokens companies={companies} onClick={this.placeToken} />
        );
        break;
      case 'TOKEN_CONTEXT':
        topMenu = (
          <EditToken onRemoveToken={this.onRemoveToken} />
        );
        break;
      default:
    }

    return (
      <div>
        {topMenu}
        <div className='row'>
          <History
          entries={this.state.history || List()}
          mapDef={this.props.mapDef}
          tileSet={this.tileSet} />

          <div
          className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
            <MapBoard
            gameInterface={this}
            hexes={
              this.mapBuilder.getHexes(this.state.tiles, this.state.tokens)
            }
            orientation={this.props.mapDef.orientation || 'east-west'}
            invertHexes={this.props.mapDef.invertHexes || false}
            addOnTop={this.mapBuilder.addOnTop}
            />
          </div>
        </div>
      </div>
    );
  }

  public onRightClickCity = (hex: string, index: number): void => {
    this.store.dispatch({
      hex,
      index,
      type: 'SHOW_AVAILABLE_TOKENS',
    });
  }

  public onRightClickToken = (
    event: MouseEvent<Element>,
    hex: string,
    index: number
  ): void => {
    this.store.dispatch({
      hex,
      index,
      type: 'SHOW_TOKEN_CONTEXT_MENU',
    });
  }

  public onRemoveToken = (): void => {
    this.store.dispatch({
      type: 'REMOVE_TOKEN',
    });
    this.store.dispatch({
      type: 'CLOSE_MENUS',
    });
  }

  public onHexClick = (hex: MapHex): void => {
    let tileFilter: List<string> | undefined;

    if (hex.props.tile && hex.props.tile.key && hex.props.tile.key !== 'pp') {
      const tileNum: string = hex.props.tile.key.toString().split('.')[0];
      tileFilter = (
        this.props.mapDef.tileManifest[tileNum].promotions || List<string>([])
      );
    } else {
      if (hex.props.allowTile && this.props.mapDef.tilePromotions) {
        let rule: any = this.props.mapDef.tilePromotions.find(
          (p: TilePromotionTuple) => !!(p.hexes && p.hexes.includes(hex.hex))
        );

        if (!rule && this.props.mapDef.tilePromotions) {
          rule = this.props.mapDef.tilePromotions.find(p => !p.hexes);
        }

        tileFilter = rule.promotions;
      }
    }

    if (tileFilter) {
      this.store.dispatch({
        hex: hex.hex,
        tileFilter,
        type: 'SHOW_AVAILABLE_TILES',
      });
    }
  }

  private placeTile = (tile: ReactElement<Tile>): void => {
    this.store.dispatch({
      tile: tile.key,
      type: 'PLACE_TILE',
    });
    this.store.dispatch({
      type: 'CLOSE_MENUS',
    });
  }

  private placeToken = (company: Company): void => {
    this.store.dispatch({
      company: company.reportingMark,
      type: 'PLACE_TOKEN',
    });
    this.store.dispatch({
      type: 'CLOSE_MENUS',
    });
  }

  private get store(): Store<GameState> {
    return this.props.store;
  }
}

export default GameInterface;
