import { Status } from './types';

export interface Todo {
    id: number;
    itemName?: string;
    dueDate?: string;
    status?: Status;
}
