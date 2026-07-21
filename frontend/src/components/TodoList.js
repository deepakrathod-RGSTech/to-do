import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../utils/api';
import { useAuth } from '../context/AuthContext';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos(token);
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTodo(token, formData);
      setFormData({ title: '', description: '' });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (todo) => {
    try {
      await updateTodo(token, todo._id, { ...todo, completed: !todo.completed });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(token, id);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setFormData({ title: todo.title, description: todo.description });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const todo = todos.find(t => t._id === editingId);
      await updateTodo(token, editingId, { ...todo, ...formData });
      setEditingId(null);
      setFormData({ title: '', description: '' });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '32px'
    },
    content: {
      maxWidth: '672px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold'
    },
    logoutButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    },
    form: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      marginBottom: '16px',
      fontSize: '16px'
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      marginBottom: '16px',
      fontSize: '16px',
      minHeight: '72px'
    },
    button: {
      width: '100%',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '8px'
    },
    cancelButton: {
      width: '100%',
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    },
    todoList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    todoItem: {
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    todoItemCompleted: {
      opacity: 0.6
    },
    todoContent: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    todoLeft: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    checkbox: {
      marginTop: '4px',
      width: '20px',
      height: '20px'
    },
    todoTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '4px'
    },
    todoTitleCompleted: {
      textDecoration: 'line-through'
    },
    todoDescription: {
      color: '#4b5563',
      marginTop: '4px'
    },
    todoActions: {
      display: 'flex',
      gap: '8px'
    },
    editButton: {
      backgroundColor: '#eab308',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px'
    },
    emptyMessage: {
      textAlign: 'center',
      color: '#6b7280',
      marginTop: '32px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Todos</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>

        <form onSubmit={editingId ? handleUpdate : handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}>
            {editingId ? 'Update Todo' : 'Add Todo'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '' });
              }}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          )}
        </form>

        <div style={styles.todoList}>
          {todos.map((todo) => (
            <div
              key={todo._id}
              style={{ ...styles.todoItem, ...(todo.completed ? styles.todoItemCompleted : {}) }}
            >
              <div style={styles.todoContent}>
                <div style={styles.todoLeft}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    style={styles.checkbox}
                  />
                  <div>
                    <h3 style={{ ...styles.todoTitle, ...(todo.completed ? styles.todoTitleCompleted : {}) }}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p style={styles.todoDescription}>{todo.description}</p>
                    )}
                  </div>
                </div>
                <div style={styles.todoActions}>
                  <button
                    onClick={() => handleEdit(todo)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p style={styles.emptyMessage}>No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
