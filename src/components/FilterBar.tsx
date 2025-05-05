import { Status } from '../types';

interface FilterBarProps {
    selectedStatus: Status | 'All';
    setSelectedStatus: React.Dispatch<React.SetStateAction<Status | 'All'>>;
}

const statuses: (Status | 'All')[] = [
    'All',
    'Archived',
    'Done',
    'Not started',
    'Progress',
];

const FilterBar = ({ selectedStatus, setSelectedStatus }: FilterBarProps) => {
    return (
        <div className="flex gap-2">
            {statuses.map((status) => (
                <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 rounded ${
                        selectedStatus === status
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}>
                    {status}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
