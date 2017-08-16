import * as React from 'react';
import { MouseEventHandler, ReactElement } from 'react';

export interface EditTokenProps {
  readonly onRemoveToken: MouseEventHandler<HTMLElement>;
}

class EditToken extends React.Component<EditTokenProps, {}> {
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

export default EditToken;
