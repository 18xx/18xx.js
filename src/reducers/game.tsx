import * as crypto from 'crypto';
import { Hash } from 'crypto';
import { List, Map } from 'immutable';
import { ReactElement } from 'react';

import MapHex from '../components/map_hex';
import Tile from '../components/tile';

export interface GameState {
  readonly cityIndex?: number;
  readonly hex?: string;
  readonly name: string;
  readonly openMenu?: string;
  readonly tileFilter?: any;
  readonly tiles: Map<string, string>;
  readonly tokens: Map<string, List<string>>;
}

export interface GameAction {
  readonly city?: any; // FIXME: No object
  readonly company?: string;
  readonly hex?: string;
  readonly index?: number;
  readonly tile?: string;
  readonly tileFilter?: List<string>;
  readonly type: string;
}

export let initialState: GameState = {
  name: '18xx',
  tiles: (Map() as Map<string, string>),
  tokens: (Map() as Map<string, List<string>>),
};

const game: any = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'CLOSE_MENUS':
      const newState: GameState = {
        ...state,
        cityIndex: undefined,
        hex: undefined,
        openMenu: undefined,
        tileFilter: undefined,
      };
      const json: string = JSON.stringify(newState);

      fetch('/update', {
        body: json,
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      });

      const hash: string = crypto.createHash('md5').update(json).digest('hex');

      history.pushState(
        newState,
        'Testing',
        '/maps/' + state.name + '/' + hash
      );
      return newState;
    case 'PLACE_TOKEN':
      let list: List<string>;
      if (state.tokens.has(state.hex)) {
        list = state.tokens.get(state.hex);
      } else {
        list = List<string>();
      }
      list = list.set(state.cityIndex, action.company);

      return {
        ...state,
        tokens: state.tokens.set(state.hex, list),
      };
    case 'SELECT_TILE':
      return {
        ...state,
        tiles: state.tiles.set(state.hex, action.tile),
      };
    case 'SHOW_AVAILABLE_TILES':
      return {
        ...state,
        hex: action.hex,
        openMenu: 'TILE',
        tileFilter: action.tileFilter,
      };
    case 'SHOW_AVAILABLE_TOKENS':
      return {
        ...state,
        cityIndex: action.index,
        hex: action.hex,
        openMenu: 'TOKEN',
      };
    default:
      return state;
  }
};

export { game };
