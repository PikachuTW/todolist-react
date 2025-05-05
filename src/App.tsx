import TodoList from './components/TodoList';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
            <TodoList />
        </div>
    );
}

export default App;
