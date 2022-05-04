import { BASE_URL } from '../../apis/apiConstants';
import { axiosInstance } from '../../apis/apiMethods';
import { useQuery } from 'react-query';
import { useCustomContext } from '../../CustomContextProvider';

type PeopleType = {
  name: string;
};

const queryEndpoint = async (
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
      queryEndpoint(data.next, arrayOfResults, setSearchResultsArray);
    }
  }

  if (data && !data.next) {
    setSearchResultsArray(arrayOfResults);
    return arrayOfResults;
  }
};

export const useSingleSearchQuery = (searchValue: string) => {
  const { entityDataToFetch, searchResultsArray, setSearchResultsArray } =
    useCustomContext();

  return useQuery(
    ['searchQuery', { searchValue, entityDataToFetch, searchResultsArray }],
    async () => {
      const entity = entityDataToFetch.toLowerCase();
      let arrayOfNames: string[] = [];

      await queryEndpoint(
        `${BASE_URL}${entity}/?search=${searchValue}`,
        [],
        setSearchResultsArray,
      );

      if (searchResultsArray) {
        arrayOfNames = convertArrayOfDataToArrayOfNames(searchResultsArray);
        return { arrayOfNames, searchResultsArray };
      }
    },
    {
      enabled: !searchValue ? false : true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );
};

export const convertArrayOfDataToArrayOfNames = (data: any) => {
  let finalArrayOfNames: Array<string> = [];

  if (data) {
    data?.forEach((result: PeopleType) => {
      return finalArrayOfNames.push(result.name);
    });
  }

  return finalArrayOfNames;
};
