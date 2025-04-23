
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchTasks } from '../services/taskService';
import { Task } from '../types/task';
import { Loader2 } from "lucide-react";

// Функция для определения цвета статуса задачи
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Новая': return 'bg-blue-500';
    case 'В процессе': return 'bg-yellow-500';
    case 'Выполнено': return 'bg-green-500';
    case 'Завершена': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

// Функция для определения цвета приоритета задачи
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Критический': return 'bg-red-500';
    case 'Высокий': return 'bg-orange-500';
    case 'Средний': return 'bg-yellow-500';
    case 'Низкий': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

// Функция форматирования даты
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch (e) {
    return dateString;
  }
};

interface TaskListProps {
  filter: 'all' | 'assigned' | 'created';
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке задач');
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
  }, []);

  // Фильтрация задач по типу
  const filteredTasks = tasks.filter(task => {
    // Здесь логика фильтрации по пользователю
    // Можно добавить проверку на текущего пользователя
    if (filter === 'all') return true;
    
    // Для примера (вы можете уточнить логику):
    // const currentUserId = getCurrentUser()?.id;
    return true; // Пока возвращаем все задачи
  });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Задач не найдено</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredTasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium">{task.task_name}</CardTitle>
              <div className="flex gap-2">
                <Badge className={`${getStatusColor(task.task_status)} text-white`}>{task.task_status}</Badge>
                <Badge className={`${getPriorityColor(task.task_priority)} text-white`}>{task.task_priority}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{task.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.employee_info.full_path_image} />
                  <AvatarFallback>
                    {task.employee_info.name.substring(0, 1)}{task.employee_info.surname.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <span>{task.employee_info.full_name || `${task.employee_info.name} ${task.employee_info.surname}`}</span>
              </div>
              <span>{formatDate(task.deadline)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
