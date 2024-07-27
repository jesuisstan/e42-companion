import { TPeer } from '@/contexts/PeerContext';

export type TCampus = {
  id: number;
  name: string;
  time_zone: string;
  language: any;
  users_count: number;
  vogsphere_id: number;
  country: string;
  address: string;
  zip: string;
  city: string;
  website: string;
  facebook: string;
  twitter: string;
  active: boolean;
  public: boolean;
  email_extension: string;
  default_hidden_phone: boolean;
};

export const defineCampus = (peer: TPeer): TCampus => {
  // Extract the domain from the user's email
  const emailDomain = peer.email.split('@')[1];

  // Filter the campuses where email_extension is contained within the email domain
  const matchingCampuses = peer.campus.filter((campus: TCampus) =>
    emailDomain.includes(campus.email_extension)
  );

  // If there are matching campuses, return the last one
  if (matchingCampuses.length > 0) {
    return matchingCampuses[matchingCampuses.length - 1];
  }

  // If no matches, return the last campus from the array
  return peer.campus[peer.campus.length - 1];
};
