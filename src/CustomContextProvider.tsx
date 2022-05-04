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

interface CustomContextType {
  userName: string;
  setUserDetails: (isAuthenticated: string) => void;
  logOut: () => void;
  entityDataToFetch: string;
  setEntityDataToFetch: (entityDataToFetch: string) => void;
}

// context
export const CustomContext = createContext<CustomContextType>({
  userName: '',
  setUserDetails: (userName: string) => userName,
  logOut: () => null,
  entityDataToFetch: 'People',
  setEntityDataToFetch: (entityDataToFetch: string) => entityDataToFetch,
});

export const CustomProvider: FunctionComponent<ContextProviderProps> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string>('');
  const [entityDataToFetch, setEntityDataToFetch] = useState<string>('People');

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
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

// Custom Hook
export const useCustomContext = () => useContext(CustomContext);
