import { Map } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { createStore, Store } from 'redux';

import GameInterface from '../../src/components/game_interface';
import { GameState } from '../../src/reducers/game';

import { mapDefinition } from '../support/map_definition';

describe('Game', () => {
  describe('#render', () => {
    const defaultState: GameState = {
      name: '18xx',
      tileFilter: Map(),
      tiles: Map(),
      tokens: Map(),
    };
    it('renders the game', () => {
      const store: Store<GameState> = createStore(() => defaultState);
      const subject: React.ReactElement<GameInterface> = (
        <GameInterface
        gameName='18xx'
        store={store}
        mapDef={mapDefinition} />
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('open menus', () => {
      it('shows the tile menu', () => {
        const state: GameState = {
          ...defaultState,
          openMenu: 'TILE',
        };
        const store: Store<GameState> = createStore(() => state);

        const subject: React.ReactElement<GameInterface> = (
          <GameInterface gameName='18xx' store={store} mapDef={mapDefinition} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token menu', () => {
        const state: GameState = {
          ...defaultState,
          openMenu: 'TOKEN',
        };
        const store: Store<GameState> = createStore(() => state);

        const subject: React.ReactElement<GameInterface> = (
          <GameInterface gameName='18xx' store={store} mapDef={mapDefinition} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token context menu', () => {
        const state: GameState = {
          ...defaultState,
          openMenu: 'TOKEN_CONTEXT',
        };
        const store: Store<GameState> = createStore(() => state);

        const subject: React.ReactElement<GameInterface> = (
          <GameInterface gameName='18xx' store={store} mapDef={mapDefinition} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
