import { createStore, Store } from 'redux';

import { GameState } from '../../src/reducers/game';

export const stubStore: Store<GameState> = createStore(jest.fn());
