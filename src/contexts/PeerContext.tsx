import {
  FC,
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react';

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

export type TProject = {
  id: number;
  occurrence: number;
  final_mark: number | null;
  status: string;
  'validated?': boolean | null;
  current_team_id: number;
  project: {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
  };
  cursus_ids: [number];
  marked_at: string | null;
  marked: boolean;
  retriable_at: string | null;
  created_at: string;
  updated_at: string;
  user: any;
  teams: [
    {
      id: number;
      name: string;
      url: string;
      final_mark: number | null;
      project_id: number;
      created_at: string;
      updated_at: string;
      status: string;
      terminating_at: string | null;
      users: [
        {
          id: number;
          login: string;
          url: string;
          leader: boolean;
          occurrence: number;
          validated: boolean | null;
          projects_user_id: number;
        }
      ];
      'locked?': boolean | null;
      'validated?': boolean | null;
      'closed?': boolean | null;
      repo_url: string;
      repo_uuid: string;
      locked_at: string;
      closed_at: string | null;
      project_session_id: number;
      project_gitlab_path: string;
    }
  ];
};

type TPeerContextType = {
  peer: TPeer | null;
  setPeer: (peer: TPeer | null) => void;
  coalitions: TCoalition[];
  setCoalitions: Dispatch<SetStateAction<TCoalition[]>>;
  projects: TProject[];
  setProjects: Dispatch<SetStateAction<TProject[]>>;
};

type TPeerProviderProps = {
  children: React.ReactNode;
};

const initialPeerContext: TPeerContextType = {
  peer: null,
  setPeer: () => {},
  coalitions: [],
  setCoalitions: () => {},
  projects: [],
  setProjects: () => {}
};

const PeerContext = createContext<TPeerContextType>(initialPeerContext);

export const PeerProvider: FC<TPeerProviderProps> = ({
  children
}: {
  children: ReactNode;
}) => {
  const [peer, setPeer] = useState<TPeer | null>(null);
  const [coalitions, setCoalitions] = useState<TCoalition[]>([]);
  const [projects, setProjects] = useState<TProject[]>([]);

  return (
    <PeerContext.Provider
      value={{
        peer,
        setPeer,
        coalitions,
        setCoalitions,
        projects,
        setProjects
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export const usePeer = () => useContext(PeerContext);
