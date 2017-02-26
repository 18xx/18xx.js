import * as Immutable from 'immutable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../css/all.css';

import AllTiles from './components/all_tiles';
import Game from './components/game';
import { MapDefinition } from './map_builder';
import { GameState, HistoryEntry, initialState } from './reducers/game';

import * as mapDef1817 from '../config/maps/1817.json';
import * as mapDef1830 from '../config/maps/1830.json';
import * as mapDef1880 from '../config/maps/1880.json';
let mapDef: MapDefinition;

const container: HTMLElement = document.getElementById('container');
const initialStateId: string = container.dataset.initialStateId;

let init: Function;
if (container.dataset.gameName !== 'null') {
  switch (container.dataset.gameName) {
    case '1817':
      mapDef = mapDef1817 as any;
      break;
    case '1830':
      mapDef = mapDef1830 as any;
      break;
    case '1880':
      mapDef = mapDef1880 as any;
      break;
    default:
      throw new Error(`Unsupported Game: ${container.dataset.gameName}`);
  }

  init = (state: GameState): void => {
    ReactDOM.render(
      <Game
      initialState={state}
      gameName={container.dataset.gameName}
      mapDef={mapDef} />,
      container
    );
  };
} else {
  init = (state: any): void => {
    ReactDOM.render(
      <AllTiles />,
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
        history: Immutable.OrderedMap<string, HistoryDetail>(data.history),
        name: container.dataset.gameName,
        tiles: Immutable.fromJS(data.tiles),
        tokens: Immutable.fromJS(data.tokens),
      };
      init(newState);
    });
  });
}
