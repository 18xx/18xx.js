import * as Immutable from 'immutable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../css/all.css';

import Game from './components/game';
import { MapDefinition } from './map_builder';
import { GameState, initialState } from './reducers/game';

import * as mapDef1817 from '../config/maps/1817.json';
import * as mapDef1830 from '../config/maps/1830.json';
let mapDef: MapDefinition;

const container: HTMLElement = document.getElementById('container');
const initialStateId: string = container.dataset.initialStateId;

switch (container.dataset.gameName) {
  case '1817':
    mapDef = mapDef1817 as any;
    break;
  case '1830':
    mapDef = mapDef1830 as any;
    break;
  default:
    throw new Error(`Unsupported Game: ${container.dataset.game}`);
}

const init: Function = (state: GameState): void => {
  ReactDOM.render(
    <Game
    initialState={state}
    gameName={container.dataset.gameName}
    mapDef={mapDef} />,
    container
  );
};

if (initialStateId === 'undefined') {
  init({
    ...initialState,
    name: container.dataset.game,
  });
} else {
  fetch('/state/' + initialStateId).then(res => {
    res.json().then(data => {
      // FIXME: Don't hardcode tiles & tokens
      const newState: GameState = {
        name: container.dataset.game,
        tiles: Immutable.fromJS(data.tiles),
        tokens: Immutable.fromJS(data.tokens),
      };
      init(newState);
    });
  });
}
