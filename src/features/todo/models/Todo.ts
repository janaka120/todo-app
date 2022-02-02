import { PageResponse } from '../../../app/appModel';
import {ApiPageResponse, ApiResponse, FieldNames, getFieldNameMap} from '../../../app/appModel';

export type TodoAction = 'CREATE' | 'UPDATE' | 'DELETE';

export type FormMode = 'ADD' | 'EDIT' | 'VIEW';

export interface Price {
	ccy: string,
	amount: number,
}

export interface Todo {
	id: string;
	text: string,
	date: string,
}

export type TodoRequest<T> = {
	action: TodoAction;
	id: string;
	entity: T | null;
};


export type GetTodoListResponse = ApiPageResponse<Todo>;
export type TodoResponse = ApiResponse<Array<Todo>>;
export type SaveTodoParam = TodoRequest<Todo>;
export type TodoPageResponse = Array<Todo>;

export const emptyTodo: Todo = {
	id: '',
	text: '',
	date: '',
};

export const LABELS = {
	ID: 'Id',
	TODO: 'Todo',
};

export type TodoFieldNames = FieldNames<Todo>;

export const TodoMasterFieldNames = getFieldNameMap(emptyTodo) as TodoFieldNames;

export const MSG = {
	LIST_LOAD_SUCCESS: 'Fetch list successfully.',
	LIST_LOAD_FAIL: 'Unable to fetch list.',
	INVALID_PARAMS: 'Parameters not supporting.',
	NO_RECORD: 'Unable to fetch the record.',
	CREATE_FAILED: 'Unable to add the record.',
	CREATE_SUCCESS: 'Add the record successfully.',
	UPDATE_FAILED: 'Unable to update the record.',
	UPDATE_SUCCESS: 'Update the record successfully.',
	DELETE_FAILED: 'Unable to delete the record.',
	DELETE_SUCCESS: 'Delete the record successfully.',
};