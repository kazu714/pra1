import { FormEvent, useEffect, useMemo, useState } from 'react';
import { loadTodos, saveTodos } from './storage';
import type { Todo } from './types';

type EditingState = {
  id: string;
  title: string;
};

const createTodo = (title: string): Todo => {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState<EditingState | null>(null);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTitle = title.trim();
    if (!nextTitle) {
      return;
    }

    setTodos((current) => [createTodo(nextTitle), ...current]);
    setTitle('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
    setEditing((current) => (current?.id === id ? null : current));
  };

  const handleStartEdit = (todo: Todo) => {
    setEditing({ id: todo.id, title: todo.title });
  };

  const handleSaveEdit = (id: string) => {
    const nextTitle = editing?.title.trim();

    if (!nextTitle) {
      return;
    }

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, title: nextTitle, updatedAt: Date.now() } : todo,
      ),
    );
    setEditing(null);
  };

  return (
    <main className="app-shell">
      <section className="app-card">
        <header className="app-header">
          <p className="eyebrow">React + Vite + TypeScript</p>
          <h1>ToDo</h1>
          <p className="subtitle">API なし、DB なし、localStorage のみで動く最小構成です。</p>
        </header>

        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            aria-label="ToDo を入力"
            className="todo-input"
            maxLength={100}
            placeholder="新しい ToDo を入力"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button className="primary-button" type="submit">
            追加
          </button>
        </form>

        <div className="summary">
          <span>合計 {todos.length}</span>
          <span>未完了 {remainingCount}</span>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">まだ ToDo がありません。</li>
          ) : (
            todos.map((todo) => {
              const isEditing = editing?.id === todo.id;

              return (
                <li className={`todo-item${todo.completed ? ' is-completed' : ''}`} key={todo.id}>
                  <label className="todo-check">
                    <input
                      checked={todo.completed}
                      type="checkbox"
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <span className="check-text">完了</span>
                  </label>

                  {isEditing ? (
                    <input
                      aria-label="ToDo を編集"
                      className="todo-edit-input"
                      maxLength={100}
                      value={editing.title}
                      onChange={(event) =>
                        setEditing({ id: todo.id, title: event.target.value })
                      }
                    />
                  ) : (
                    <span className="todo-title">{todo.title}</span>
                  )}

                  <div className="todo-actions">
                    {isEditing ? (
                      <>
                        <button
                          className="secondary-button"
                          type="button"
                          onClick={() => handleSaveEdit(todo.id)}
                        >
                          保存
                        </button>
                        <button
                          className="ghost-button"
                          type="button"
                          onClick={() => setEditing(null)}
                        >
                          取消
                        </button>
                      </>
                    ) : (
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() => handleStartEdit(todo)}
                      >
                        編集
                      </button>
                    )}
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      削除
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;
