interface AddTodoProps {
    formData: {
        itemName: string;
        dueDate: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            itemName: string;
            dueDate: string;
        }>
    >;
    handleAdd: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({
    formData,
    setFormData,
    handleAdd,
}) => {
    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Todo Name"
                value={formData.itemName}
                onChange={(e) =>
                    setFormData({ ...formData, itemName: e.target.value })
                }
                className="border p-2 rounded w-64"
            />
            <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                }
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={handleAdd}
                disabled={
                    !formData.itemName.trim() || !formData.dueDate.trim()
                }>
                Add
            </button>
        </div>
    );
};

export default AddTodo;
