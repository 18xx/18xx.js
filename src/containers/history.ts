import { List } from 'immutable';
import { ComponentClass, connect } from 'react-redux';

import HistoryInterface, {
  HistoryProps,
  HistoryStateProps,
} from '../components/history';

import { GameState } from '../reducers/game';

function mapStateToProps(state: GameState): HistoryStateProps {
  return {
    entries: state.history || List(),
  };
}

const History: ComponentClass<Partial<HistoryProps>> = connect(
  mapStateToProps,
)(HistoryInterface);

export default History;
