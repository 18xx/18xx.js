import { ComponentClass, connect, Dispatch } from 'react-redux';

import Company from '../company';

import AvailableTokensInterface, {
  AvailableTokensMappedProps,
  AvailableTokensProps,
} from '../components/available_tokens';

function mapDispatchToProps(
  dispatch: Dispatch<AvailableTokensMappedProps>
): AvailableTokensMappedProps {
  const onClick: (company: Company) => void = (company: Company) => {
    dispatch({ company: company.reportingMark, type: 'PLACE_TOKEN' });
    dispatch({ type: 'CLOSE_MENUS' });
  };

  return {
    onClick,
  };
}

const AvailableTokens: ComponentClass<Partial<AvailableTokensProps>> = connect(
  null,
  mapDispatchToProps
)(AvailableTokensInterface);

export default AvailableTokens;
