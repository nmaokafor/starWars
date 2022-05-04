import { BASE_URL } from '../../apis/apiConstants';
import { axiosInstance } from '../../apis/apiMethods';
import { useQuery } from 'react-query';
import { useCustomContext } from '../../CustomContextProvider';

type PeopleType = {
  name: string;
  fetchWithWookiee: boolean;
};

type WookiePeopleType = {
  whrascwo: string;
  fetchWithWookiee: boolean;
};

const querySearchEndpoint = async (
  url: string,
  arrayOfResults: any[],
  setSearchResultsArray: {
    (searchResultsArray: any): void;
    (arg0: any[]): void;
  },
) => {
  //    is it okay to pass custom hook here from the parent?
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

  if (data && !data.next) {
    setSearchResultsArray(arrayOfResults);
    return arrayOfResults;
  }
};

const querySearchForWookie = async (url: string, arrayOfResults: any[]) => {
  const { data } = await axiosInstance({
    method: 'GET',
    url,
  });

  if (data) {
    const stringResponse = data?.replace(/whhuanan/g, '"whhuanan"');
    const parsedResponse = JSON.parse(stringResponse);

    arrayOfResults = [...arrayOfResults].concat(parsedResponse.rcwochuanaoc);
  }

  return arrayOfResults;
};

export const useSingleSearchQuery = (searchValue: string) => {
  const {
    entityDataToFetch,
    searchResultsArray,
    setSearchResultsArray,
    fetchWithWookiee,
  } = useCustomContext();

  return useQuery(
    ['searchQuery', { searchValue, entityDataToFetch, fetchWithWookiee }],
    async () => {
      const entity = entityDataToFetch.toLowerCase();
      let arrayOfNames: string[] = [];
      let arrayOfWookieNames: string[] = [];

      if (!fetchWithWookiee) {
        await querySearchEndpoint(
          `${BASE_URL}${entity}/?search=${searchValue}`,
          [],
          setSearchResultsArray,
        );

        if (searchResultsArray) {
          arrayOfNames = convertArrayOfDataToArrayOfNames(
            searchResultsArray,
            fetchWithWookiee,
          );
          return { arrayOfNames, searchResultsArray };
        }
      } else if (fetchWithWookiee) {
        const searchResultsArray = await querySearchForWookie(
          `${BASE_URL}${entity}/?search=${searchValue}&format=wookiee`,
          [],
        );
        arrayOfWookieNames = convertArrayOfDataToArrayOfNames(
          searchResultsArray,
          fetchWithWookiee,
        );
        return { arrayOfWookieNames, searchResultsArray };
      }
    },
    {
      enabled: !searchValue ? false : true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
};

export const convertArrayOfDataToArrayOfNames = (
  data: any,
  fetchWithWookiee: boolean,
) => {
  let finalArrayOfNames: Array<string> = [];

  if (data && !fetchWithWookiee) {
    data?.forEach((result: PeopleType) => {
      return finalArrayOfNames.push(result.name);
    });
  } else if (data && fetchWithWookiee) {
    data?.forEach((result: WookiePeopleType) => {
      return finalArrayOfNames.push(result.whrascwo);
    });
  }

  return finalArrayOfNames;
};
