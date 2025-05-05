import React from 'react';
import DeleteButton from './DeleteButton';
import StatusButton from './StatusButton';
import { Todo } from '../interfaces';

const Button = ({ children }: { children: React.ReactNode }) => (
    <button onClick={(e) => e.stopPropagation()}>{children}</button>
);

interface todoItemProps {
    todo: Todo;
    onStatusChange: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const TodoItem = ({
    todo,
    onStatusChange,
    onDelete,
    onEdit,
}: todoItemProps) => {
    const content = (
        <div className="flex justify-between items-center p-4 border-b">
            <span className="text-gray-700">{todo.itemName || 'Unnamed'}</span>
            <span className="text-gray-500 text-sm">
                {todo.dueDate || 'No Due Date'}
            </span>
            <div className="flex items-center space-x-4 p-4 bg-gray-300">
                <Button>
                    <StatusButton
                        status={todo.status}
                        onStatusChange={onStatusChange}
                    />
                </Button>
                <Button>
                    <button onClick={onEdit}>🖊️</button>
                </Button>
                <Button>
                    <DeleteButton onDelete={onDelete} />
                </Button>
            </div>
        </div>
    );
    return todo.status == 'Done' ? (
        <div className="opacity-50 line-through">{content}</div>
    ) : (
        content
    );
};

export default TodoItem;
