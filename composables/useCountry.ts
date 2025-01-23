import { countries } from '~/constants';
import type { GeoLocation } from '~/types';

export const useCountry = () => {
    // State to store the countries to be shown - init with static countries
    const countriesToShow = useState<GeoLocation[]>('countriesToShow', () => countries);

    // State to store states for each country state
    const countryStatesDict = useState<{ [code: string]: GeoLocation[] }>('countryStatesDict', () => ({}));

    return {
        countriesToShow,
        countryStatesDict,
    };
};
