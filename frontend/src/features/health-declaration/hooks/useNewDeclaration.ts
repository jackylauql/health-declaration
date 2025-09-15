import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/axios';

export type CREATE_DECLARATION_PAYLOAD = {
  full_name: string;
  temperature: number;
  symptoms: string[];
  close_contact_with_covid: boolean;
};

const newDeclarations = (data: CREATE_DECLARATION_PAYLOAD) =>
  axiosInstance.post('/health-declarations', data);

const useNewDeclarations = () =>
  useMutation({ mutationKey: ['createDeclaration'], mutationFn: newDeclarations });

export { useNewDeclarations };
