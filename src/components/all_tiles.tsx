import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import { MapDefinition } from '../map_builder';
import TileDefinition, { TileDefinitionInput } from '../tile_definition';

interface AllTilesProps {
  readonly mapDef: MapDefinition;
  readonly tiles: List<TileDefinitionInput>;
}

class AllTiles extends React.Component<AllTilesProps, {}> {
  public get tiles(): List<JSX.Element> {
    return this.props.tiles.map(
      (t: TileDefinitionInput) =>
      <div key={t.num}>
        {new TileDefinition(this.props.mapDef, t).allRotations}
      </div>
    ).toList();
}

  public render(): ReactElement<AllTiles> {
    return <div id='all-tiles'>{this.tiles}</div>;
  }
}

export default AllTiles;
