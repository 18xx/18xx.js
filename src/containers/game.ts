import { ComponentClass, connect, Dispatch } from 'react-redux';

import GameInterface, {
  GameInterfaceMappedProps,
  GameInterfaceProps,
} from '../components/game_interface';
import { GameState } from '../reducers/game';

function mapStateToProps(state: GameState): GameInterfaceMappedProps {
  return {
    history: state.history,
    openMenu: state.openMenu,
    tileFilter: state.tileFilter,
    tiles: state.tiles,
    tokens: state.tokens,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<GameInterfaceProps>
): Partial<GameInterfaceProps> {
  return {};
}

const Game: ComponentClass<Partial<GameInterfaceProps>> = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameInterface);

export default Game;
