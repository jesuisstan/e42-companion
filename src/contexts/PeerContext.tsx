import { FC, createContext, ReactNode, useContext, useState } from 'react';

export type TPeer = {};
type TPeerContextType = {
  peer: TPeer | null;
  setPeer: (peer: TPeer | null) => void;
};

type TPeerProviderProps = {
  children: React.ReactNode;
};

const initialPeerContext: TPeerContextType = {
  peer: null,
  setPeer: () => {}
};

const PeerContext = createContext<TPeerContextType>(initialPeerContext);

export const PeerProvider: FC<TPeerProviderProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [peer, setPeer] = useState<TPeer | null>(null);

  return (
    <PeerContext.Provider value={{ peer, setPeer }}>
      {children}
    </PeerContext.Provider>
  );
};

export const usePeer = () => useContext(PeerContext);
