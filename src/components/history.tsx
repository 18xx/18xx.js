import { List } from 'immutable';
import * as React from 'react';
import { ReactElement } from 'react';

import Tile from './tile';
import Token from './token';

import Company from '../company';
import { MapDefinition } from '../map_builder';
import TileDefinition from '../tile_definition';
import TileSet from '../tile_set';

export interface HashlessHistoryEntry {
  readonly action: string;
  readonly hex: string;
  readonly id: string;
}

export interface HistoryEntry {
  readonly action: string;
  readonly hash: string;
  readonly hex: string;
  readonly id: string;
}

export interface HistoryInitProps {
  readonly mapDef: MapDefinition;
  readonly tileSet: TileSet;
}

export interface HistoryStateProps {
  readonly entries: List<HistoryEntry>;
}

export type HistoryProps = HistoryInitProps & HistoryStateProps;

class History extends React.Component<HistoryProps, {}> {
  public render(): ReactElement<HTMLElement> {
    return (
      <div className='col-sm-3 col-md-2 sidebar'>
        <h4>Recent Moves</h4>
        <ol reversed>
          {this.props.entries.reverse().map(
            (value: HistoryEntry, idx: number) => this.drawEntry(value, idx)
          )}
        </ol>
      </div>
    );
  }

  private drawEntry = (
    entry: HistoryEntry,
    idx: number,
  ): ReactElement<HTMLElement> => {
    let description: ReactElement<HTMLElement>;
    switch (entry.action) {
      case 'PLACE_TILE':
        const tileNum: string[] = entry.id.split('.');
        const tileDef: TileDefinition = this.props.tileSet.findDefinition(
          tileNum[0]
        );
        const tile: ReactElement<Tile> = tileDef.tile(parseInt(tileNum[1], 10));

        description = (
          <span>
            <span className='tile'>{tile}</span> {entry.id} @ {entry.hex}
          </span>
        );
        break;
      case 'PLACE_TOKEN':
        const company: Company = Company.fromJson(
          entry.id,
          this.props.mapDef.companies[entry.id]
        );
        const token: ReactElement<Token> = (
          <Token
          text={company.shorthand}
          primaryColor={company.primaryColor}
          secondaryColor={company.secondaryColor}
          textColor={company.textColor} />
        );
        description = <span>{token} {entry.id} @ {entry.hex}</span>;
        break;
      case 'REMOVE_TOKEN':
        description = <span>Rm-Tok: {entry.id} @ {entry.hex}</span>;
        break;
      default:
        description = <span>Unknown</span>;
    }

    return (
      <li key={idx}>
        <a href={`./${entry.hash}`}>
          {description}
        </a>
      </li>
    );
  }
}

export default History;
