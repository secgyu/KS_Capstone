import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants';
import type { Marker, UseQueryCustomOptions } from '@/types';
import { getMarkers } from '@/api/marker';

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
