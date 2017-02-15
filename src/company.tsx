import * as Immutable from 'immutable';

import * as companiesJson from '../config/companies.json';

const allCompanies: any = Immutable.fromJS(companiesJson);

interface CompanyData {
  readonly name: string;
  readonly shorthand: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly textColor: string;
}

export default class Company {
  public static find(reportingMark: string): Company {
    if (allCompanies.has(reportingMark)) {
      const data: CompanyData = allCompanies.get(reportingMark).toJS();

      return new Company(
        reportingMark,
        data.name,
        data.shorthand,
        data.primaryColor,
        data.secondaryColor,
        data.textColor,
      );
    } else if (!isNaN(Number(reportingMark))) {
      return new Company(
        reportingMark,
        reportingMark,
        reportingMark,
        'white',
        'white',
        'black',
      );
    } else {
      throw new Error(`Could not find company: ${reportingMark}`);
    }
  }

  constructor(
    public readonly reportingMark: string,
    public readonly name: string,
    public readonly shorthand: string,
    public readonly primaryColor: string,
    public readonly secondaryColor: string,
    public readonly textColor: string
  ) {
  }
}
