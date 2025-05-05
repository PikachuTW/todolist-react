type EditForm = {
    itemName: string;
    dueDate: string;
};

type EditTodoProps = {
    editForm: EditForm;
    setEditForm: React.Dispatch<React.SetStateAction<EditForm>>;
    handleEditSave: () => void;
    handleEditCancel: () => void;
};

const EditTodo: React.FC<EditTodoProps> = ({
    editForm,
    setEditForm,
    handleEditSave,
    handleEditCancel,
}) => {
    return (
        <div className="flex gap-2 bg-yellow-100 p-2 rounded">
            <input
                type="text"
                value={editForm.itemName}
                onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        itemName: e.target.value,
                    })
                }
                className="border p-2 rounded w-64"></input>
            <input
                type="date"
                value={editForm.dueDate}
                onChange={(e) =>
                    setEditForm({
                        ...editForm,
                        dueDate: e.target.value,
                    })
                }
                className="border p-2 rounded w-64"></input>
            <button
                onClick={handleEditSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={
                    !editForm.itemName.trim() || !editForm.dueDate.trim()
                }>
                Save
            </button>
            <button
                onClick={handleEditCancel}
                className="bg-gray-400 text-white px-4 py-2  rounded">
                Cancel
            </button>
        </div>
    );
};

export default EditTodo;
