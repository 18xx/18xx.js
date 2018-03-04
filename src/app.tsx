import * as Immutable from 'immutable';
import { List } from 'immutable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import '../css/all.css';

import AllTiles from './components/all_tiles';
import { HistoryEntry } from './components/history';
import Game from './containers/game';

import { MapDefinition } from './map_builder';
import { TileDefinitionInput } from './tile_definition';

import { game, GameState, initialState } from './reducers/game';

import * as mapDef1817 from '../config/maps/1817.json';
import * as mapDef1830 from '../config/maps/1830.json';
import * as mapDef1849 from '../config/maps/1849.json';
import * as mapDef1880 from '../config/maps/1880.json';
import * as mapDef1889 from '../config/maps/1889.json';
let mapDef: MapDefinition;

import * as allTilesJson from '../config/tiles.json';

const allTiles: List<TileDefinitionInput> =
  Immutable.fromJS(allTilesJson).map(
    (el: any) => el.toJS() as TileDefinitionInput
  );

const container: HTMLElement | null = document.getElementById('map-container');
if (!container) {
  throw new Error('Did not find map-container element');
}

const initialStateId: string | undefined = container.dataset.initialStateId;

let init: (state: any) => void;
if (container.dataset.gameName && container.dataset.gameName !== 'tiles') {
  switch (container.dataset.gameName) {
    case '1817':
      mapDef = mapDef1817 as any;
      break;
    case '1830':
      mapDef = mapDef1830 as any;
      break;
    case '1849':
      mapDef = mapDef1849 as any;
      break;
    case '1880':
      mapDef = mapDef1880 as any;
      break;
    case '1889':
      mapDef = mapDef1889 as any;
      break;
    default:
      throw new Error(`Unsupported Game: ${container.dataset.gameName}`);
  }

  init = (state: GameState): void => {
    const store: Store<GameState> = createStore(
      game,
      state,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );

    ReactDOM.render(
      <Provider store={store}>
        <Game gameName={container.dataset.gameName!} mapDef={mapDef} />
      </Provider>,
      container
    );
  };
} else {
  init = (state: GameState): void => {
    const store: Store<GameState> = createStore(
      game,
      state,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );

    ReactDOM.render(
      <Provider store={store}>
        <AllTiles mapDef={mapDef1830 as any} tiles={allTiles} />
      </Provider>,
      container
    );
  };
}

if (initialStateId === 'undefined') {
  init({
    ...initialState,
    name: container.dataset.gameName,
  });
} else {
  fetch('/state/' + initialStateId).then(res => {
    res.json().then(data => {
      // FIXME: Don't hardcode tiles & tokens
      const newState: GameState = {
        history: Immutable.List<HistoryEntry>(data.history),
        name: container.dataset.gameName!,
        tiles: Immutable.fromJS(data.tiles),
        tokens: Immutable.fromJS(data.tokens),
      };
      init(newState);
    });
  });
}
