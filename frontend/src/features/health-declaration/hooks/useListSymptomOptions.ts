import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/axios';

export type LIST_SYMPTOM_OPTIONS_RESPONSE = {
  symptom_name: string;
  id: string;
};

const listSymptomOptions = () =>
  axiosInstance.get<LIST_SYMPTOM_OPTIONS_RESPONSE[]>('/health-declarations/symptoms', {});

const useListSymptomOptions = () =>
  useQuery({
    queryKey: ['listSymptomOptions'],
    queryFn: listSymptomOptions,
  });

export { useListSymptomOptions };
