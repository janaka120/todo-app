import { toast } from 'react-toastify';
import { Todo } from '../models/Todo';
import { getTodoList, removeTodo, addTodo, editTodo } from '../services/TodoSvc';
import {
	apiCallStarts,
	apiCallError,
	fetchTodoListSuccess,
	onDeleteSuccess,
	addNewTodoSuccess,
	updateTodoSuccess,
} from '../reducer/TodoReducer';
import {AppDispatch, GetState, AppThunk} from '../../../app/Store';

export const fetchTodoList =
	(): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(apiCallStarts());
			let response;
			response = await getTodoList();
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(fetchTodoListSuccess(data));
				toast.success(msg);
			} else {
				dispatch(apiCallError());
				toast.error(msg);
			}
		} catch (e) {}
	};

export const deleteTodo =
	(id: string): AppThunk =>
	async (dispatch: AppDispatch, getState: GetState) => {
		try {
			const {todoList} = getState().Todo;
			dispatch(apiCallStarts());
			let response;
			response = await removeTodo(id, todoList);
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(onDeleteSuccess(data));
				toast.success(msg);
			} else {
				dispatch(apiCallError());
				toast.error(msg);
			}
		} catch (e) {}
	};

export const createTodo =
	(newTodo: Todo): AppThunk =>
	async (dispatch: AppDispatch, getState: GetState) => {
		try {
			const {todoList} = getState().Todo;
			dispatch(apiCallStarts());
			let response;
			response = await addTodo(newTodo, todoList);
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(addNewTodoSuccess(data));
				toast.success(msg);
			} else {
				dispatch(apiCallError());
				toast.error(msg);
			}
		} catch (e) {}
	};

	export const updateTodo =
	(updatedTodo: Todo): AppThunk =>
	async (dispatch: AppDispatch, getState: GetState) => {
		try {
			const {todoList} = getState().Todo;
			dispatch(apiCallStarts());
			let response;
			response = await editTodo(updatedTodo, todoList);
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(updateTodoSuccess(data));
				toast.success(msg);
			} else {
				dispatch(apiCallError());
				toast.error(msg);
			}
		} catch (e) {}
	};
