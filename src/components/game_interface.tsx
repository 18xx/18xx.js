import * as Immutable from 'immutable';
import { List, Map } from 'immutable';
import * as React from 'react';
import { MouseEvent, ReactElement } from 'react';
import { Store } from 'redux';

import * as allTilesJson from '../../config/tiles.json';

import AvailableTiles from '../containers/available_tiles';
import AvailableTokens from '../containers/available_tokens';
import EditToken from '../containers/edit_token';
import History, { HistoryEntry } from './history';
import MapBoard from './map_board';

import { GameState } from '../reducers/game';

import Company from '../company';
import MapBuilder, { MapDefinition } from '../map_builder';
import { TileDefinitionInput } from '../tile_definition';
import TileSet, { TileSetDetails } from '../tile_set';

const allTiles: List<TileDefinitionInput> =
  Immutable.fromJS(allTilesJson).map(
    (el: any) => el.toJS() as TileDefinitionInput
  );

export interface GameInterfaceInitProps {
  readonly gameName: string;
  readonly mapDef: MapDefinition;
  readonly store: Store<GameState>;
}

export interface GameInterfaceMappedProps {
  readonly history?: List<HistoryEntry>;
  readonly openMenu?: string;
  readonly tileFilter?: any;
  readonly tiles: Map<string, string>;
  readonly tokens: Map<string, List<string>>;
}

export type GameInterfaceProps =
  GameInterfaceInitProps & GameInterfaceMappedProps;

class GameInterface
  extends React.Component<GameInterfaceProps, {}> {

  public readonly tileSet: TileSet;
  private mapBuilder: MapBuilder;

  constructor(props: GameInterfaceProps) {
    super(props);

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

    switch (this.props.openMenu) {
      case 'TILE':
        topMenu = (
          <AvailableTiles
            tileFilter={this.props.tileFilter}
            tiles={this.props.tiles}
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
          <AvailableTokens companies={companies} />
        );
        break;
      case 'TOKEN_CONTEXT':
        topMenu = <EditToken />;
        break;
      default:
    }

    return (
      <div>
        {topMenu}
        <div className='row'>
          <History
          entries={this.props.history || List()}
          mapDef={this.props.mapDef}
          tileSet={this.tileSet} />

          <div
          className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
            <MapBoard
            hexes={
              this.mapBuilder.getHexes(this.props.tiles, this.props.tokens)
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

  private get store(): Store<GameState> {
    return this.props.store;
  }
}

export default GameInterface;
