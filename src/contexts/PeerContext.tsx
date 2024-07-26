import { FC, createContext, ReactNode, useContext, useState } from 'react';

export type TPeer = any;

export type TCoalition = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  cover_url: string;
  color: string;
  score: number;
  user_id: number;
};

type TPeerContextType = {
  peer: TPeer | null;
  setPeer: (peer: TPeer | null) => void;
  coalitions: TCoalition[];
  setCoalitions: (coalitions: TCoalition[]) => void;
};

type TPeerProviderProps = {
  children: React.ReactNode;
};

const initialPeerContext: TPeerContextType = {
  peer: null,
  setPeer: () => {},
  coalitions: [],
  setCoalitions: () => {}
};

const PeerContext = createContext<TPeerContextType>(initialPeerContext);

export const PeerProvider: FC<TPeerProviderProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [peer, setPeer] = useState<TPeer | null>(null);
  const [coalitions, setCoalitions] = useState<TCoalition[]>([]);

  return (
    <PeerContext.Provider value={{ peer, setPeer, coalitions, setCoalitions }}>
      {children}
    </PeerContext.Provider>
  );
};

export const usePeer = () => useContext(PeerContext);
