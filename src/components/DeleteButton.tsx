const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
    <button className="text-sm text-red-500 hover:underline" onClick={onDelete}>
        Delete
    </button>
);

export default DeleteButton;
