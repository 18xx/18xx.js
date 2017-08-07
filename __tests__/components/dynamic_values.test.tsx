import * as React from 'react';
import * as renderer from 'react-test-renderer';

import DynamicValues, {
  DynamicValueSet
} from '../../src/components/dynamic_values';

import Hexagon from '../../src/hexagon';

describe('DynamicValues', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#render', () => {
    describe('when fixedHeight is not set', () => {
      it('returns svg for the values', () => {
        const values: DynamicValueSet = { yellow: 20, green: 40 };
        const subject: React.ReactElement<DynamicValues> = (
          <DynamicValues hexagon={hexagon} values={values} />
        );
        expect(renderer.create(subject)).toMatchSnapshot();
      });
    });

    describe('when fixedHeight is set', () => {
      it('returns svg for the values', () => {
        const dv: DynamicValues = new DynamicValues({
          fixedHeight: 4,
          hexagon,
          values: { yellow: 20, green: 40 },
        });
        expect(dv.toString()).toMatchSnapshot();
      });
    });
  });
});
