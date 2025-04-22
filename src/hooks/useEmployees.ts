
import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/types/employee';

const fetchEmployees = async (search?: string): Promise<Employee[]> => {
  const searchParams = new URLSearchParams();
  if (search) {
    searchParams.append('search', search);
  }
  
  const response = await fetch(`/api/v1/catalog/employees/?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const useEmployees = (search?: string) => {
  return useQuery({
    queryKey: ['employees', search],
    queryFn: () => fetchEmployees(search),
  });
};
