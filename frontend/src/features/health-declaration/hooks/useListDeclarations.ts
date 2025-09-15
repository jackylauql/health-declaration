import { useQuery } from '@tanstack/react-query';
import { BASE_PAGINATED_RESULTS } from '@/types';
import { axiosInstance } from '@/utils/axios';

export type LIST_DECLARATIONS_RESPONSE = {
  results: {
    full_name: string;
    temperature: number;
    symptom_ids: string[];
    close_contact_with_covid: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
} & BASE_PAGINATED_RESULTS;

const listDeclarations = (searchParams: URLSearchParams) =>
  axiosInstance.get<LIST_DECLARATIONS_RESPONSE>('/health-declarations', {
    params: {
      page: searchParams.get('page'),
      pageSize: searchParams.get('pageSize'),
    },
  });

const useListDeclarations = (searchParams: URLSearchParams) =>
  useQuery({
    queryKey: [
      'listDeclarations',
      JSON.stringify(`${searchParams.get('page')}${searchParams.get('pageSize')}`),
    ],
    queryFn: () => listDeclarations(searchParams),
  });

export { useListDeclarations };
