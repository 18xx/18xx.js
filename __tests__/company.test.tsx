import Company from '../src/company';

describe('Company', () => {
  describe('.fromJson', () => {
    it('initializes a company company and populates its data', () => {
      const subject: Company = Company.fromJson(
        'B&O',
        {
          home: 'i15',
          name: 'Baltimore and Ohio Railroad',
          primaryColor: '#0B00F7',
          secondaryColor: 'white',
          shorthand: 'B&O',
          textColor: 'black',
          tokens: 3,
        },
      );
      expect(subject.reportingMark).toEqual('B&O');
      expect(subject.name).toEqual('Baltimore and Ohio Railroad');
      expect(subject.primaryColor).toEqual('#0B00F7');
      expect(subject.secondaryColor).toEqual('white');
      expect(subject.textColor).toEqual('black');
      expect(subject.shorthand).toEqual('B&O');
    });
  });
});
