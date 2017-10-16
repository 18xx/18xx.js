import { GameState } from './reducers/game';

export interface Store {
  getState: (hash: string) => Promise<GameState | undefined>;
  setState: (hash: string, body: GameState) => Promise<boolean>;
}
