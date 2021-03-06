import { Map } from 'immutable';

import { GameState } from '../reducers/game';

import { Store } from '../store';

class MemoryStore implements Store {
  private map: Map<string, GameState>;

  constructor() {
    this.map = Map<string, GameState>();
  }

  public getState(hash: string): Promise<GameState | undefined> {
    return Promise.resolve(this.map.get(hash));
  }

  public setState(hash: string, body: GameState): Promise<boolean> {
    this.map = this.map.set(hash, body);
    return Promise.resolve(true);
  }
}

export default MemoryStore;
