import { Map } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import GameInterface, {
  GameInterfaceProps
} from '../../src/components/game_interface';

import { mapDefinition } from '../support/map_definition';
import { stubStore } from '../support/store';

describe('Game', () => {
  describe('#render', () => {
    const props: GameInterfaceProps = {
      gameName: '18xx',
      mapDef: mapDefinition,
      tileFilter: Map(),
      tiles: Map(),
      tokens: Map(),
    };
    it('renders the game', () => {
      const subject: React.ReactElement<GameInterface> = (
        <Provider store={stubStore}>
          <GameInterface {...props} />
        </Provider>
      );

      expect(renderer.create(subject)).toMatchSnapshot();
    });

    describe('open menus', () => {
      it('shows the tile menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={stubStore}>
            <GameInterface {...props} openMenu='TILE' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={stubStore}>
            <GameInterface {...props} openMenu='TOKEN' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });

      it('shows the token context menu', () => {
        const subject: React.ReactElement<GameInterface> = (
          <Provider store={stubStore}>
            <GameInterface {...props} openMenu='TOKEN_CONTEXT' />
          </Provider>
        );

        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });
  });
});
