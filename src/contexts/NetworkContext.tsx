import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import NetInfo from '@react-native-community/netinfo';

type TNetworkContextState = {
  isConnected: boolean;
};

type TNetworkProviderProps = {
  children: ReactNode;
};

const NetworkContext = createContext<TNetworkContextState | undefined>(
  undefined
);

export const NetworkProvider: FC<TNetworkProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): TNetworkContextState => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
