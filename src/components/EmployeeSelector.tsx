
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from '@/types/employee';
import { useEmployees } from '@/hooks/useEmployees';

interface EmployeeSelectorProps {
  onSelect: (employeeId: number) => void;
  selectedId?: number;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ onSelect, selectedId }) => {
  const [search, setSearch] = useState("");
  const { data: employees = [], isLoading, error } = useEmployees(search);
  
  const selectedEmployee = employees.find(emp => emp.id === selectedId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedEmployee ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={selectedEmployee.full_path_image} />
                <AvatarFallback>{selectedEmployee.name[0]}{selectedEmployee.surname[0]}</AvatarFallback>
              </Avatar>
              <span>{selectedEmployee.full_name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Выберите сотрудника</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="flex items-center border-b p-2">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Поиск сотрудника..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        <ScrollArea className="h-72">
          <div className="p-2">
            {isLoading ? (
              <p className="text-sm text-center text-muted-foreground p-4">
                Загрузка...
              </p>
            ) : error ? (
              <p className="text-sm text-center text-destructive p-4">
                Ошибка загрузки данных
              </p>
            ) : employees.length === 0 ? (
              <p className="text-sm text-center text-muted-foreground p-4">
                Сотрудники не найдены
              </p>
            ) : (
              employees.map((employee) => (
                <Button
                  key={employee.id}
                  variant="ghost"
                  className="w-full justify-start mb-1"
                  onClick={() => onSelect(employee.id)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={employee.full_path_image} />
                      <AvatarFallback>{employee.name[0]}{employee.surname[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{employee.full_name}</span>
                      <span className="text-xs text-muted-foreground">{employee.position.title} • {employee.department}</span>
                    </div>
                  </div>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default EmployeeSelector;
