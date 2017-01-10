import DynamicValues from '../../src/components/dynamic_values';

describe('DynamicValues', () => {
  describe('#toString', () => {
    describe('when fixedHeight is not set', () => {
      it('returns svg for the values', () => {
        const dv: DynamicValues = new DynamicValues({
          values: { yellow: 20, green: 40 }
        });
        expect(dv.toString()).toMatchSnapshot();
      });
    });

    describe('when fixedHeight is set', () => {
      it('returns svg for the values', () => {
        const dv: DynamicValues = new DynamicValues({
          fixedHeight: 4,
          values: { yellow: 20, green: 40 },
        });
        expect(dv.toString()).toMatchSnapshot();
      });
    });
  });
});
