import { List, Map } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import { createStore, Store } from 'redux';

import GameInterface, {
  GameInterfaceProps
} from '../../src/components/game_interface';

import { GameState } from '../../src/reducers/game';

import { mapDefinition } from '../support/map_definition';

describe('Game', () => {
  describe('#render', () => {
    const props: GameInterfaceProps = {
      gameName: '18xx',
      mapDef: mapDefinition,
      tiles: Map(),
      tokens: Map(),
    };

    const store: Store<GameState> = createStore(() => {
      return {
        name: '18xx',
        tileFilter: Map(),
        tiles: Map<string, string>(),
        tokens: Map<string, List<string>>(),
      };
    });

    it('renders the game', () => {
      const subject: React.ReactElement<GameInterface> = (
        <Provider store={store}>
          <GameInterface {...props} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('open menus', () => {
      it('shows the tile menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={store}>
            <GameInterface {...props} openMenu='TILE' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={store}>
            <GameInterface {...props} openMenu='TOKEN' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token context menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={store}>
            <GameInterface {...props} openMenu='TOKEN_CONTEXT' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
