import { GameState } from './reducers/game';

export interface Store {
  getState: (hash: string) => Promise<GameState>;
  setState: (hash: string, body: GameState) => Promise<boolean>;
}
