import { BASE_URL } from '../../apis/apiConstants';
import { axiosInstance } from '../../apis/apiMethods';
import { useQuery } from 'react-query';
import { useCustomContext } from '../../CustomContextProvider';

const querySearchEndpoint = async (url: string) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });

  return data?.results;
};

const querySearchForWookie = async (url: string) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });
  let arrayOfResults: Array<string> = [];

  if (data) {
    const stringResponse = data?.replace(/whhuanan/g, '"whhuanan"');
    const parsedResponse = JSON.parse(stringResponse);

    arrayOfResults = [...arrayOfResults].concat(parsedResponse.rcwochuanaoc);
  }
  return arrayOfResults;
};

export const useSingleSearchQuery = (searchValue: string) => {
  const { entityDataToFetch, fetchWithWookiee } = useCustomContext();

  return useQuery(
    ['autoCompleteQuery', { searchValue, entityDataToFetch, fetchWithWookiee }],
    async () => {
      const entity = entityDataToFetch.toLowerCase();

      if (!fetchWithWookiee) {
        return await querySearchEndpoint(
          `${BASE_URL}${entity}/?search=${searchValue}`,
        );
      } else {
        return await querySearchForWookie(
          `${BASE_URL}${entity}/?search=${searchValue}&format=wookiee`,
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
