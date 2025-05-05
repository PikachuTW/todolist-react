import { useCallback, useState } from 'react';
import { Todo } from '../interfaces';
import TodoItem from './TodoItem';
import { Status } from '../types';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import FilterBar from './FilterBar';

const initialTodos: Todo[] = [
    {
        id: 1,
        itemName: 'Buy groceries',
        dueDate: '2023-10-01',
        status: 'Not started',
    },
    {
        id: 2,
        itemName: 'Finish project',
        dueDate: '2023-10-05',
        status: 'Progress',
    },
    { id: 3 },
    {
        id: 4,
        itemName: 'Read a book',
        dueDate: '2023-10-15',
        status: 'Not started',
    },
    {
        id: 5,
        itemName: 'Go for a walk',
        dueDate: '2023-10-20',
        status: 'Progress',
    },
    { id: 6, itemName: 'Clean the house', status: 'Done' },
    {
        id: 7,
        itemName: 'Finish homework',
        dueDate: '2023-10-30',
        status: 'Not started',
    },
    {
        id: 8,
        itemName: 'Prepare for presentation',
        dueDate: '2023-11-05',
        status: 'Progress',
    },
    {
        id: 9,
        itemName: 'Grocery shopping',
        dueDate: '2023-11-10',
        status: 'Done',
    },
    {
        id: 10,
        itemName: 'Visit grandma',
        dueDate: '2023-11-15',
        status: 'Not started',
    },
];

const nextStatusMap: ReadonlyMap<Status, Status> = new Map([
    ['Not started', 'Progress'],
    ['Progress', 'Done'],
    ['Done', 'Archived'],
    ['Archived', 'Not started'],
]);

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    const handleStatusChange = useCallback((todoId: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (
                    todo.id === todoId &&
                    todo.status &&
                    nextStatusMap.has(todo.status)
                ) {
                    return { ...todo, status: nextStatusMap.get(todo.status) };
                }
                return todo;
            })
        );
    }, []);

    const handleDelete = useCallback((todoId: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    }, []);

    const [formData, setFormData] = useState({
        itemName: '',
        dueDate: '',
    });

    const [editForm, setEditForm] = useState({ itemName: '', dueDate: '' });

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleAdd = useCallback(() => {
        const trimmedItemName = formData.itemName.trim();
        const trimmedDueDate = formData.dueDate.trim();
        if (!trimmedItemName || !trimmedDueDate) return;
        const newTodo: Todo = {
            id: Date.now(),
            itemName: trimmedItemName,
            dueDate: trimmedDueDate,
            status: 'Not started',
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setFormData({
            itemName: '',
            dueDate: '',
        });
    }, [formData]);

    const handleEditStart = useCallback((todo: Todo) => {
        setEditingId(todo.id);
        setEditForm({
            itemName: todo.itemName || '',
            dueDate: todo.dueDate || '',
        });
    }, []);

    const handleEditSave = useCallback(() => {
        if (!editForm.itemName.trim() || !editForm.dueDate.trim()) return;

        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id !== editingId) return todo;
                return {
                    ...todo,
                    itemName: editForm.itemName,
                    dueDate: editForm.dueDate,
                };
            })
        );

        setEditingId(null);
        setEditForm({ itemName: '', dueDate: '' });
    }, [editForm, editingId]);

    const handleEditCancel = useCallback(() => {
        setEditingId(null);
        setEditForm({ itemName: '', dueDate: '' });
    }, []);

    const [selectedStatus, setSelectedStatus] = useState<Status | 'All'>('All');

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
            <AddTodo
                formData={formData}
                setFormData={setFormData}
                handleAdd={handleAdd}
            />
            {editingId !== null && (
                <EditTodo
                    editForm={editForm}
                    setEditForm={setEditForm}
                    handleEditSave={handleEditSave}
                    handleEditCancel={handleEditCancel}
                />
            )}
            <div className="space-y-2">
                <FilterBar
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />
                {todos
                    .filter(
                        (todo) =>
                            selectedStatus === 'All' ||
                            todo.status === selectedStatus
                    )
                    .map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onStatusChange={() => handleStatusChange(todo.id)}
                            onDelete={() => handleDelete(todo.id)}
                            onEdit={() => handleEditStart(todo)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default TodoList;
