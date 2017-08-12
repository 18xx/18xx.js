import { Map } from 'immutable';
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
    const store: Store<GameState> = createStore(jest.fn());
    const props: GameInterfaceProps = {
      gameName: '18xx',
      mapDef: mapDefinition,
      store,
      tileFilter: Map(),
      tiles: Map(),
      tokens: Map(),
    };
    it('renders the game', () => {
      const subject: React.ReactElement<GameInterface> = (
        <Provider store={store}>
          <GameInterface {...props} store={store} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('open menus', () => {
      it('shows the tile menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={store}>
            <GameInterface {...props} store={store} openMenu='TILE' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={store}>
            <GameInterface {...props} store={store} openMenu='TOKEN' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token context menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={store}>
            <GameInterface {...props} store={store} openMenu='TOKEN_CONTEXT' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
