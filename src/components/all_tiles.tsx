import * as Immutable from 'immutable';
import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapDefinition } from '../map_builder';
import TileDefinition, { TileDefinitionInput } from '../tile_definition';

import * as allTilesJson from '../../config/tiles.json';

const allTiles: List<TileDefinitionInput> =
  Immutable.fromJS(allTilesJson).map(
    (el: any) => el.toJS() as TileDefinitionInput
  );

interface AllTilesProps {
  readonly mapDef: MapDefinition;
}

class AllTiles extends React.Component<AllTilesProps, {}> {
  public get tiles(): any {
    return allTiles.map((t: TileDefinitionInput) =>
      <div key={t.num}>
        {new TileDefinition(this.props.mapDef, t).allRotations}
      </div>
    );
  }

  public render(): ReactElement<AllTiles> {
    return <div id='all-tiles'>{this.tiles}</div>;
  }
}

export default AllTiles;
