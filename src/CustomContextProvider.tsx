import {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  useEffect,
} from 'react';

interface ContextProviderProps {
  children: React.ReactNode;
}

type DataSetsType = {
  id?: number;
  label?: string | number | undefined;
  data?: Array<number> | number | undefined;
  backgroundColor?: string | undefined;
};

type BarChartData = {
  labels: Array<string>;
  datasets: Array<DataSetsType>;
};

type SearchResultsData = {
  next: string;
  previous: string;
  results: any[];
  rcwochuanaoc: any[];
};

interface CustomContextType {
  userName: string;
  setUserDetails: (isAuthenticated: string) => void;
  logOut: () => void;
  entityDataToFetch: string;
  setEntityDataToFetch: (entityDataToFetch: string) => void;
  searchResults: SearchResultsData;
  setSearchResults: (searchResults: any) => void;
  fetchWithWookiee: boolean;
  setFetchWithWookiee: (fetchWithWookiee: boolean) => void;
  resultsQueryValue: string;
  setResultsQueryValue: (resultsQueryValue: string) => void;
  submitButtonClicked: boolean;
  setSubmitButtonClicked: (submitButtonClicked: boolean) => void;
  barChartData: any;
  setBarChartData: (barChartData: any) => void;
}

// context
export const CustomContext = createContext<CustomContextType>({
  userName: '',
  setUserDetails: (userName: string) => userName,
  logOut: () => null,
  entityDataToFetch: 'People',
  setEntityDataToFetch: (entityDataToFetch: string) => entityDataToFetch,
  searchResults: {
    next: '',
    previous: '',
    results: [],
    rcwochuanaoc: [],
  },
  setSearchResults: (searchResults: SearchResultsData) => searchResults,
  fetchWithWookiee: false,
  setFetchWithWookiee: (fetchWithWookiee: boolean) => fetchWithWookiee,
  resultsQueryValue: '',
  setResultsQueryValue: (resultsQueryValue: string) => resultsQueryValue,
  submitButtonClicked: false,
  setSubmitButtonClicked: (submitButtonClicked: boolean) => submitButtonClicked,
  barChartData: {
    labels: [],
    datasets: [],
  },
  setBarChartData: (barChartData: BarChartData) => barChartData,
});

export const CustomProvider: FunctionComponent<ContextProviderProps> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string>('');
  const [entityDataToFetch, setEntityDataToFetch] = useState<string>('People');
  const [searchResults, setSearchResults] = useState({
    next: '',
    previous: '',
    results: [],
    rcwochuanaoc: [],
  });
  const [fetchWithWookiee, setFetchWithWookiee] = useState<boolean>(false);
  const [resultsQueryValue, setResultsQueryValue] = useState<string>('');
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (user?.length) {
      setUserName(user);
    } else {
      localStorage.clear();
    }
  }, []);

  const setUserDetails = (name: string) => {
    localStorage.setItem('userName', name);
    setUserName(name);
  };

  const logOut = async () => {
    window.location.replace('/');
    localStorage.clear();
  };

  return (
    <CustomContext.Provider
      value={{
        userName,
        setUserDetails,
        logOut,
        entityDataToFetch,
        setEntityDataToFetch,
        searchResults,
        setSearchResults,
        fetchWithWookiee,
        setFetchWithWookiee,
        resultsQueryValue,
        setResultsQueryValue,
        submitButtonClicked,
        setSubmitButtonClicked,
        barChartData,
        setBarChartData,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

// Custom Hook
export const useCustomContext = () => useContext(CustomContext);
