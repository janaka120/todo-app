import { TodoPageResponse } from '../models/Todo';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodoState} from '../models/TodoReducerState';

const initialState: TodoState = {
	//list
	todoList: [],
	isInProgress: false,
	//form
	mode: 'ADD',
};

export const TodoReducer = createSlice({
	name: 'Todo',
	initialState,
	reducers: {
		
		// --- fetch client list ---
		apiCallStarts: (state) => {
			state.isInProgress = true;
		},
		apiCallError: (state, action: PayloadAction) => {
			state.isInProgress = false;
		},
		addNewTodoSuccess: (state, action: PayloadAction<TodoPageResponse>) => {
			state.todoList = action.payload;
			state.isInProgress = false;
		},
		updateTodoSuccess: (state, action: PayloadAction<TodoPageResponse>) => {
			state.todoList = action.payload;
			state.isInProgress = false;
		},
		fetchTodoListSuccess: (state, action: PayloadAction<TodoPageResponse>) => {
			state.todoList = action.payload;
			state.isInProgress = false;
		},
		onDeleteSuccess: (state, action: PayloadAction<TodoPageResponse>) => {
			// list
			state.todoList = action.payload;
			state.isInProgress = false;
		},
	},
});

export const {
	apiCallStarts,
	apiCallError,
	fetchTodoListSuccess,
	addNewTodoSuccess,
	onDeleteSuccess,
	updateTodoSuccess,
} = TodoReducer.actions;

export default TodoReducer.reducer;

