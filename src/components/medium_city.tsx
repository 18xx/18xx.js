import * as React from 'react';
import { ReactElement } from 'react';

import Town from './town';

import Point from '../point';

const DEFAULT_RADIUS: number = 10;

class MediumCity extends Town {
  protected drawCircle(point: Point): ReactElement<any> {
    return (
      <g key={`outer-${point.x}-${point.y}`}>
        <circle
          cx={point.x}
          cy={point.y}
          r={DEFAULT_RADIUS * 2}
          fill='none'
          strokeWidth={2}
          stroke='black'
        />
        <circle
          cx={point.x}
          cy={point.y}
          fill='black'
          r={DEFAULT_RADIUS}
          strokeWidth={2}
          stroke='black'
        />
      </g>
    );
  }
}

export default MediumCity;
