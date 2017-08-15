import { ComponentClass, connect } from 'react-redux';

import GameInterface, {
  GameInterfaceMappedProps,
  GameInterfaceProps,
} from '../components/game_interface';
import { GameState } from '../reducers/game';

function mapStateToProps(state: GameState): GameInterfaceMappedProps {
  return {
    history: state.history,
    openMenu: state.openMenu,
    tiles: state.tiles,
    tokens: state.tokens,
  };
}

const Game: ComponentClass<Partial<GameInterfaceProps>> = connect(
  mapStateToProps,
)(GameInterface);

export default Game;
