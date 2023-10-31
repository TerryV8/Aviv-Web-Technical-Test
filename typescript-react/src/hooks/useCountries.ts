import countries from 'world-countries';

interface Country {
  countryCode: string;
  label: string;
  flag: string;
  region: string;
}

const formattedCountries: Country[] = countries.map((item) => ({
  countryCode: item.cca2,
  label: item.name.common,
  flag: item.flag,
  region: item.region,
}));

const useCountries = () => {
  const getAllCountries = (): Country[] => formattedCountries;

  return { getAllCountries };
};

export default useCountries;
