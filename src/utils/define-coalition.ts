import { TCoalition } from '@/contexts/PeerContext';

// Function foo which accepts an array of TCoalition and returns the desired item
export const defineCoalition = (coalitions: TCoalition[]): TCoalition => {
  if (coalitions.length === 0) {
    // Return an item with nullable values if the array is empty
    return {
      id: null,
      name: null,
      slug: null,
      image_url: null,
      cover_url: null,
      color: null,
      score: null,
      user_id: null
    } as unknown as TCoalition;
  }

  // Filter items with score > 0
  const filteredCoalitions = coalitions.filter(
    (coalition) => coalition.score > 0
  );

  // Return the last item with score > 0, or the last item of the array if none found
  return filteredCoalitions.length > 0
    ? filteredCoalitions[filteredCoalitions.length - 1]
    : coalitions[coalitions.length - 1];
};
