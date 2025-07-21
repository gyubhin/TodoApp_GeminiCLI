import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
`;

const AppContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 550px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const InputArea = styled.div`
  display: flex;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: black; /* 입력된 글자색 검정으로 변경 */
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &.completed span {
    text-decoration: line-through;
    color: #aaa;
  }
`;

const TodoItemContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;
`;

const TodoText = styled.span`
  cursor: pointer;
  flex-grow: 1;
  padding: 0 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:nth-of-type(1) {
    background-color: #2ecc71;
    color: white;
  }

  &:nth-of-type(2) {
    background-color: #e74c3c;
    color: white;
  }
`;

const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: -12px;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText('');
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>Todo List</Title>
        <InputArea>
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <Button onClick={addTodo}>Add</Button>
        </InputArea>
        <List>
          {todos.map(todo => (
            <ListItem key={todo.id} className={todo.completed ? 'completed' : ''}>
              <TodoItemContainer>
                <CheckboxContainer>
                  <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo.id)}
                  />
                  <span className="checkmark"></span>
                </CheckboxContainer>
                {editingId === todo.id ? (
                  <TodoInput
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <TodoText onClick={() => startEditing(todo.id, todo.text)}>{todo.text}</TodoText>
                )}
              </TodoItemContainer>
              <ButtonGroup>
                {editingId === todo.id ? (
                  <ActionButton onClick={() => saveEdit(todo.id)}>Save</ActionButton>
                ) : (
                  <ActionButton onClick={() => startEditing(todo.id, todo.text)}>Edit</ActionButton>
                )}
                <ActionButton onClick={() => deleteTodo(todo.id)}>Delete</ActionButton>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
      </AppContainer>
    </>
  );
}

export default App;