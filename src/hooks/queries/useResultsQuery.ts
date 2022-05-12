import { BASE_URL } from '../../apis/apiConstants';
import { axiosInstance } from '../../apis/apiMethods';
import { useQuery } from 'react-query';
import { useCustomContext } from '../../CustomContextProvider';

const querySearchEndpoint = async (url: string) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });

  return data;
};

const querySearchForWookie = async (url: string) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });
  let parsedResponse: Array<string> = [];

  if (data) {
    const stringResponse = data?.replace(/whhuanan/g, '"whhuanan"');
    parsedResponse = JSON.parse(stringResponse);
  }
  return parsedResponse;
};

export const useResultsQuery = (searchValue: string, page: number) => {
  const { entityDataToFetch, fetchWithWookiee, setSearchResults } =
    useCustomContext();

  return useQuery(
    ['resultsQuery', { searchValue, page }],
    async () => {
      const entity = entityDataToFetch.toLowerCase();

      if (!fetchWithWookiee) {
        const response = await querySearchEndpoint(
          `${BASE_URL}${entity}/?search=${searchValue}&page=${page}`,
        );
        setSearchResults(response);
      } else {
        const response = await querySearchForWookie(
          `${BASE_URL}${entity}/?search=${searchValue}&format=wookiee`,
        );
        setSearchResults(response);
      }
    },
    {
      enabled: searchValue.length > 0 ? true : false,
      refetchOnWindowFocus: false,
    },
  );
};
