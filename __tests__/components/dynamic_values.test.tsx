import DynamicValues from '../../src/components/dynamic_values';

import Hexagon from '../../src/hexagon';

describe('DynamicValues', () => {
  const hexagon: Hexagon = new Hexagon('east-west');

  describe('#toString', () => {
    describe('when fixedHeight is not set', () => {
      it('returns svg for the values', () => {
        const dv: DynamicValues = new DynamicValues({
          hexagon,
          values: { yellow: 20, green: 40 }
        });
        expect(dv.toString()).toMatchSnapshot();
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
