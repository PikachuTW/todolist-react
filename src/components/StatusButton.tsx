import { Status } from '../types';

const colorMap: Record<Status, string> = {
    'Not started': 'bg-gray-200 text-gray-700',
    Progress: 'bg-indigo-300 text-blue-800',
    Done: 'bg-green-200 text-green-950',
    Archived: 'bg-yellow-500 text-yellow-900',
};

interface statusButtonState {
    status?: Status;
    onStatusChange: () => void;
}

const StatusButton = ({
    status = 'Not started',
    onStatusChange,
}: statusButtonState) => {
    return (
        <button
            onClick={onStatusChange}
            className={`text-sm border w-28 rounded px-2 py-1 focus:outline-none ${colorMap[status]} hover:cursor-pointer`}>
            {status}
        </button>
    );
};

export default StatusButton;
