import { ComponentClass, connect, Dispatch } from 'react-redux';

import TokenInterface, {
  TokenMappedProps,
  TokenProps,
} from '../components/token';

function mapDispatchToProps(
  dispatch: Dispatch<TokenMappedProps>
): TokenMappedProps {
  const onRightClick: (
    hex: string,
    index: number
  ) => void = (hex: string, index: number) => {
    dispatch({ hex, index, type: 'SHOW_TOKEN_CONTEXT_MENU' });
  };

  return {
    onRightClick,
  };
}

const Token: ComponentClass<Partial<TokenProps>> = connect(
  null,
  mapDispatchToProps
)(TokenInterface);

export default Token;
