import Company from '../src/company';

describe('Company', () => {
  describe('.find', () => {
    describe('when the company exists in the list', () => {
      it('finds the company and populates its data', () => {
        const subject: Company = Company.find('GTW');
        expect(subject.name).toEqual('Grand Trunk Western Railroad');
        expect(subject.primaryColor).toEqual('#1F3871');
        expect(subject.secondaryColor).toEqual('white');
        expect(subject.textColor).toEqual('black');
        expect(subject.shorthand).toEqual('GTW');
      });
    });

    describe('when the company does not exist in the list', () => {
      it('throws an error', () => {
        const fn: Function = () => Company.find('NONONO');
        expect(fn).toThrowError('Could not find company: NONONO');
      });
    });
  });
});
