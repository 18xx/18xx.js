import * as crypto from 'crypto';
import { Hash } from 'crypto';
import { List, Map } from 'immutable';
import { ReactElement } from 'react';
import { Reducer } from 'redux';

import { HashlessHistoryEntry, HistoryEntry } from '../components/history';
import MapHex from '../components/map_hex';
import Tile from '../components/tile';

export interface GameState {
  readonly cityIndex?: number;
  readonly hex?: string;
  readonly history?: List<HistoryEntry>;
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
  history: List<HistoryEntry>(),
  name: '18xx',
  tiles: (Map() as Map<string, string>),
  tokens: (Map() as Map<string, List<string>>),
};

function persistState(
  state: GameState,
  detail: HashlessHistoryEntry,
): GameState {
  const historyFreeState: GameState = {
    ...resetMenus(state),
    history: undefined,
  };
  const hfJson: string = JSON.stringify(historyFreeState);
  const hash: string = crypto.createHash('sha256').update(hfJson).digest('hex');

  const resetState: GameState = {
    ...resetMenus(state),
    history: state.history.push({...detail, hash}),
  };

  const json: string = JSON.stringify(resetState);

  fetch('/update', {
    body: json,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  });

  history.pushState(
    resetState,
    'Testing',
    '/maps/' + state.name + '/' + hash
  );

  return resetState;
}

function resetMenus(state: GameState): GameState {
  return {
    ...state,
    cityIndex: undefined,
    hex: undefined,
    openMenu: undefined,
    tileFilter: undefined,
  };
}

const game: Reducer<GameState> = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'CLOSE_MENUS':
      return resetMenus(state);
    case 'PLACE_TOKEN':
      let list: List<string>;
      if (state.tokens.has(state.hex)) {
        list = state.tokens.get(state.hex);
      } else {
        list = List<string>();
      }
      list = list.set(state.cityIndex, action.company);

      return persistState(
        {
          ...state,
          tokens: state.tokens.set(state.hex, list),
        },
        {
          action: action.type,
          hex: state.hex,
          id: action.company,
        }
      );

    case 'REMOVE_TOKEN':
      const removed: string = state.tokens.get(state.hex).get(state.cityIndex);
      const removedList: List<string> = state.tokens.get(state.hex).delete(
        state.cityIndex
      );

      return persistState(
        {
          ...resetMenus(state),
          tokens: state.tokens.set(state.hex, removedList),
        },
        {
          action: action.type,
          hex: state.hex,
          id: removed,
        }
      );

    case 'PLACE_TILE':
      return persistState(
        {
          ...state,
          tiles: state.tiles.set(state.hex, action.tile),
        },
        {
          action: action.type,
          hex: state.hex,
          id: action.tile,
        }
      );

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
    case 'SHOW_TOKEN_CONTEXT_MENU':
      return {
        ...state,
        cityIndex: action.index,
        hex: action.hex,
        openMenu: 'TOKEN_CONTEXT'
      };
    default:
      return state;
  }
};

export { game };
