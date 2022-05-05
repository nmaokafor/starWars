import { BASE_URL } from '../../apis/apiConstants';
import { axiosInstance } from '../../apis/apiMethods';
import { useQuery } from 'react-query';
import { useCustomContext } from '../../CustomContextProvider';

const querySearchEndpoint = async (
  url: string,
  arrayOfResults: any[],
  setSearchResultsArray: {
    (searchResultsArray: any): void;
  },
) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });

  if (data && data?.results) {
    arrayOfResults = [...arrayOfResults].concat(data.results);
    if (data?.next) {
      querySearchEndpoint(data.next, arrayOfResults, setSearchResultsArray);
    }
  }

  if (data && !data?.next) {
    setSearchResultsArray(arrayOfResults);
    return arrayOfResults;
  }
};

const querySearchForWookie = async (
  url: string,
  arrayOfResults: any[],
  setSearchResultsArray: {
    (searchResultsArray: any): void;
  },
) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });

  if (data) {
    const stringResponse = data?.replace(/whhuanan/g, '"whhuanan"');
    const parsedResponse = JSON.parse(stringResponse);

    arrayOfResults = [...arrayOfResults].concat(parsedResponse.rcwochuanaoc);
  }
  setSearchResultsArray(arrayOfResults);
  return arrayOfResults;
};

export const useSingleSearchQuery = (searchValue: string) => {
  const { entityDataToFetch, setSearchResultsArray, fetchWithWookiee } =
    useCustomContext();

  return useQuery(
    ['searchQuery', { searchValue, entityDataToFetch, fetchWithWookiee }],
    async () => {
      const entity = entityDataToFetch.toLowerCase();

      if (!fetchWithWookiee) {
        return await querySearchEndpoint(
          `${BASE_URL}${entity}/?search=${searchValue}`,
          [],
          setSearchResultsArray,
        );
      } else {
        return await querySearchForWookie(
          `${BASE_URL}${entity}/?search=${searchValue}&format=wookiee`,
          [],
          setSearchResultsArray,
        );
      }
    },
    {
      enabled: !searchValue ? false : true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
};
