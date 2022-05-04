import { BASE_URL } from '../../apis/apiConstants';
import { getData } from '../../apis/apiMethods';
import { useQuery } from 'react-query';

export const useLogin = ({ username }: { username: string }) => {
  return useQuery(
    ['loginQuery', username],
    () => {
      return getData(`${BASE_URL}/people/?search=${username}`);
    },
    { enabled: false, refetchOnWindowFocus: false },
  );
};
