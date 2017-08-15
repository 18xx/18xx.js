import { ComponentClass, connect, Dispatch } from 'react-redux';

import AvailableTilesInterface, {
  AvailableTilesDispatchProps,
  AvailableTilesProps,
  AvailableTilesStateProps,
} from '../components/available_tiles';

import { GameState } from '../reducers/game';

function mapStateToProps(state: GameState): AvailableTilesStateProps {
  return {
    tileFilter: state.tileFilter,
    tiles: state.tiles,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AvailableTilesDispatchProps>
): AvailableTilesDispatchProps {
  const onClick: (tileKey: string) => void = (tileKey: string) => {
    dispatch({ tile: tileKey, type: 'PLACE_TILE' });
    dispatch({ type: 'CLOSE_MENUS' });
  };

  return {
    onClick,
  };
}

const AvailableTiles: ComponentClass<Partial<AvailableTilesProps>> = connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableTilesInterface);

export default AvailableTiles;
