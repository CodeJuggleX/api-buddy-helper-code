
import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/types/employee';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.38.236:8000';

const fetchEmployees = async (search?: string): Promise<Employee[]> => {
  const searchParams = new URLSearchParams();
  if (search) {
    searchParams.append('search', search);
  }
  
  try {
    console.log('Fetching employees from:', `${API_BASE_URL}/api/v1/catalog/employees/?${searchParams.toString()}`);
    const response = await fetch(`${API_BASE_URL}/api/v1/catalog/employees/?${searchParams.toString()}`);
    
    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      throw new Error('Failed to fetch employees');
    }
    
    const data = await response.json();
    console.log('Employees data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const useEmployees = (search?: string) => {
  return useQuery({
    queryKey: ['employees', search],
    queryFn: () => fetchEmployees(search),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
