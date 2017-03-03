import * as Immutable from 'immutable';
import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import TileDefinition, { TileDefinitionInput } from '../tile_definition';

import * as allTilesJson from '../../config/tiles.json';

const allTiles: List<TileDefinitionInput> =
  Immutable.fromJS(allTilesJson).map(
    (el: any) => el.toJS() as TileDefinitionInput
  );

interface AllTilesProps {
  readonly orientation: string;
}

export default class AllTiles
extends React.Component<AllTilesProps, undefined> {

  public get tiles(): any {
    return allTiles.map(t =>
      <div key={t.num}>
        {new TileDefinition(t, this.props.orientation).allRotations}
      </div>
    );
  }

  public render(): ReactElement<AllTiles> {
    return <div id='all-tiles'>{this.tiles}</div>;
  }
}
