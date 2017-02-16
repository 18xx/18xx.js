import * as React from 'react';
import { MouseEvent, MouseEventHandler, ReactElement } from 'react';

interface EditTokenProps {
  readonly onRemoveToken: MouseEventHandler<HTMLElement>;
}

export default class EditToken
extends React.Component<EditTokenProps, undefined> {
  public render(): ReactElement<EditToken> {
    return (
      <div id='tokenMenu'>
        <button onClick={this.props.onRemoveToken}>
          Remove Token
        </button>
      </div>
    );
  }
}
