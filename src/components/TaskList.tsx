
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Временные моковые данные
const mockTasks = [
  {
    id: 1,
    title: "Создать дизайн главной страницы",
    description: "Необходимо разработать дизайн главной страницы в соответствии с брендбуком",
    status: "В процессе",
    priority: "Высокий",
    assignee: { name: "Алексей К.", avatar: "" },
    created_by: { name: "Иван С.", avatar: "" },
    created_at: "2025-04-20"
  },
  {
    id: 2,
    title: "Исправить баг с авторизацией",
    description: "При авторизации через Google не сохраняются данные пользователя",
    status: "Новая",
    priority: "Критический",
    assignee: { name: "Мария П.", avatar: "" },
    created_by: { name: "Иван С.", avatar: "" },
    created_at: "2025-04-21"
  },
  {
    id: 3,
    title: "Обновить документацию API",
    description: "Добавить описание новых эндпоинтов и обновить примеры запросов",
    status: "Выполнено",
    priority: "Средний",
    assignee: { name: "Сергей Л.", avatar: "" },
    created_by: { name: "Мария П.", avatar: "" },
    created_at: "2025-04-19"
  }
];

// Функция для определения цвета статуса задачи
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Новая': return 'bg-blue-500';
    case 'В процессе': return 'bg-yellow-500';
    case 'Выполнено': return 'bg-green-500';
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

interface TaskListProps {
  filter: 'all' | 'assigned' | 'created';
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  // Фильтрация задач (здесь будет логика фильтрации по пользователю)
  const filteredTasks = mockTasks;
  
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
              <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
              <div className="flex gap-2">
                <Badge className={`${getStatusColor(task.status)} text-white`}>{task.status}</Badge>
                <Badge className={`${getPriorityColor(task.priority)} text-white`}>{task.priority}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{task.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback>{task.assignee.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{task.assignee.name}</span>
              </div>
              <span>{task.created_at}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
