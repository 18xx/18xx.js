import * as Immutable from 'immutable';

interface CompanyData {
  readonly home?: string;
  readonly name: string;
  readonly shorthand: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly textColor: string;
  readonly tokens?: number;
}

class Company {
  public static fromJson(reportingMark: string, data: CompanyData): Company {
    return new Company(
      reportingMark,
      data.name,
      data.shorthand,
      data.primaryColor,
      data.secondaryColor,
      data.textColor,
    );
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

export default Company;
