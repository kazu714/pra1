export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
};

export const TODO_STORAGE_KEY = 'simple-todo-app:v1';
