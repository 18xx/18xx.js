import { ComponentClass, connect, Dispatch } from 'react-redux';

import AvailableTilesInterface, {
  AvailableTilesMappedProps,
  AvailableTilesProps,
} from '../components/available_tiles';

function mapDispatchToProps(
  dispatch: Dispatch<AvailableTilesMappedProps>
): AvailableTilesMappedProps {
  const onClick: (tileKey: string) => void = (tileKey: string) => {
    dispatch({ tile: tileKey, type: 'PLACE_TILE' });
    dispatch({ type: 'CLOSE_MENUS' });
  };

  return {
    onClick,
  };
}

const AvailableTiles: ComponentClass<Partial<AvailableTilesProps>> = connect(
  null,
  mapDispatchToProps
)(AvailableTilesInterface);

export default AvailableTiles;
