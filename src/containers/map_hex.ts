import { List } from 'immutable';
import { ComponentClass, connect, Dispatch } from 'react-redux';

import { TilePromotionTuple } from '../map_builder';

import MapHexInterface, {
  MapHexInitProps,
  MapHexMappedProps,
  MapHexProps,
} from '../components/map_hex';

function mapDispatchToProps(
  dispatch: Dispatch<MapHexMappedProps>,
  props: MapHexInitProps,
): MapHexMappedProps {
  const onHexClick: (hex: MapHexInterface) => void =
    (hex: MapHexInterface) => {
      let tileFilter: List<string> | undefined;

      if (hex.props.tile && hex.props.tile.key && hex.props.tile.key !== 'pp') {
        const tileNum: string = hex.props.tile.key.toString().split('.')[0];
        tileFilter = (
          props.mapDef.tileManifest[tileNum].promotions || List<string>([])
        );
      } else {
        if (hex.props.allowTile && props.mapDef.tilePromotions) {
          let rule: any = props.mapDef.tilePromotions.find(
            (p: TilePromotionTuple) => !!(p.hexes && p.hexes.includes(hex.hex))
          );

          if (!rule && props.mapDef.tilePromotions) {
            rule = props.mapDef.tilePromotions.find(p => !p.hexes);
          }

          tileFilter = rule.promotions;
        }
      }

      if (tileFilter) {
        dispatch({
          hex: hex.hex,
          tileFilter,
          type: 'SHOW_AVAILABLE_TILES',
        });
      }
    };

  return {
    onHexClick,
  };
}

const MapHex: ComponentClass<Partial<MapHexProps>> = connect(
  null,
  mapDispatchToProps
)(MapHexInterface);

export default MapHex;
