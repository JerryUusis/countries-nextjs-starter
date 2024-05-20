import { Country } from "./country";

interface CountriesStateType {
  countries: {
    countries: Country[];
    isLoading: boolean;
  };
}

interface VisitedCountriesStateType {
  visitedCountries: {
    visitedCountries: string[];
  };
}

export { CountriesStateType, VisitedCountriesStateType };
