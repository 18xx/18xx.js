import { List, Map } from 'immutable';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Game from '../../src/components/game';
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
      const subject: React.ReactElement<Game> = (
        <Game
        gameName='18xx'
        initialState={defaultState}
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

        const subject: React.ReactElement<Game> = (
          <Game gameName='18xx' initialState={state} mapDef={mapDefinition} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token menu', () => {
        const state: GameState = {
          ...defaultState,
          openMenu: 'TOKEN',
        };

        const subject: React.ReactElement<Game> = (
          <Game gameName='18xx' initialState={state} mapDef={mapDefinition} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token context menu', () => {
        const state: GameState = {
          ...defaultState,
          openMenu: 'TOKEN_CONTEXT',
        };

        const subject: React.ReactElement<Game> = (
          <Game gameName='18xx' initialState={state} mapDef={mapDefinition} />
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
