import { ComponentClass, connect, Dispatch } from 'react-redux';

import EditTokenInterface, {
  EditTokenProps,
} from '../components/edit_token';

function mapDispatchToProps(
  dispatch: Dispatch<EditTokenProps>
): EditTokenProps {
  const onRemoveToken: () => void = () => {
    dispatch({ type: 'REMOVE_TOKEN' });
    dispatch({ type: 'CLOSE_MENUS' });
  };

  return {
    onRemoveToken,
  };
}

const EditToken: ComponentClass<Partial<EditTokenProps>> = connect(
  null,
  mapDispatchToProps
)(EditTokenInterface);

export default EditToken;
