import { Todo, FormMode } from './Todo';

export interface TodoState {
	// list
	todoList: Array<Todo>;
	isInProgress: boolean; //list fetch
	mode: FormMode;
}
