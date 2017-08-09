import { ComponentClass, connect, Dispatch } from 'react-redux';

import GameInterface, {
  GameInterfaceProps
} from '../components/game_interface';

function mapStateToProps(): Partial<GameInterfaceProps> {
  return {};
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
