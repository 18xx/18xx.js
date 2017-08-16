import { ComponentClass, connect, Dispatch } from 'react-redux';

import CityCircleInterface, {
  CityCircleMappedProps,
  CityCircleProps,
} from '../components/city_circle';

function mapDispatchToProps(
  dispatch: Dispatch<CityCircleMappedProps>
): CityCircleMappedProps {
  const onContextMenu: (
    hex: string,
    index: number
  ) => void = (hex: string, index: number) => {
    dispatch({ hex, index, type: 'SHOW_AVAILABLE_TOKENS' });
  };

  return {
    onContextMenu,
  };
}

const CityCircle: ComponentClass<Partial<CityCircleProps>> = connect(
  null,
  mapDispatchToProps
)(CityCircleInterface);

export default CityCircle;
