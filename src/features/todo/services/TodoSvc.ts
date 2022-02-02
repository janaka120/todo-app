import { TodoResponse } from '../models/Todo';
import { Todo, GetTodoListResponse, MSG } from '../models/Todo';

export const getTodoList = async () => {
	const returnVal: GetTodoListResponse = {
		success: false,
	};
	try {
		const res = await JSON.parse(window.localStorage.getItem('Todos')!);
		console.log('--getTodoList--', res);
		if (
			res &&
			Array.isArray(res)
		) {
			const validList: Array<Todo> = [];
			res.forEach((itm: Todo) => {
				const validObj = validateTodo(itm);
				if (validObj) {
					validList.push(validObj);
				}
			});
			returnVal.success = true;
			returnVal.data = sortTodoListByDate(validList);
			returnVal.msg = MSG.LIST_LOAD_SUCCESS;

			if (validList.length !== res.length) {
				console.log('--getTodoList validation issue --', validList.length, res.length);
			}
		} else {
			throw `status_${res.status}`;
		}
	} catch (e) {
		returnVal.msg = MSG.LIST_LOAD_FAIL;
	}
	return returnVal;
};

const validateTodo = (itm: Todo): Todo | null => {
	const {
		id,
		text,
		date,
	} = itm;
	if (id && text && date) {
		return {
			id,
			text,
			date,
		};
	}
	return null;
};

export const addTodo = async (newTodo: Todo, todoList: Todo[]): Promise<TodoResponse> => {
	const returnVal: TodoResponse = {
		success: false,
	};
	console.log("addTodo svc ==>", newTodo);
	try {
		if (!newTodo || !todoList) {
			throw {message: MSG.INVALID_PARAMS};
		}
		const newTodoList = [...todoList, newTodo];
		await window.localStorage.setItem('Todos', JSON.stringify(newTodoList));

		returnVal.success = true;
		returnVal.data = sortTodoListByDate(newTodoList);
		returnVal.msg = MSG.CREATE_SUCCESS;
	} catch (e) {
		console.log('--saveTodo-- error', e);
		returnVal.msg = MSG.CREATE_FAILED;
	}
	return returnVal;
};

export const removeTodo = async (id: string, TodoList: Todo[]): Promise<TodoResponse> => {
	const returnVal: TodoResponse = {
		success: false,
	};
	try {
		if (!id || !TodoList) {
			throw {message: MSG.INVALID_PARAMS};
		}

		const newTodoList = TodoList.filter(e => e.id !== id);
		await window.localStorage.setItem('Todos', JSON.stringify(newTodoList));

		returnVal.success = true;
		returnVal.data = sortTodoListByDate(newTodoList);
		returnVal.msg = MSG.DELETE_SUCCESS;
	} catch (e) {
		console.log('--deleteTodo-- error', e);
		returnVal.msg = MSG.DELETE_FAILED;
	}
	return returnVal;
};

export const editTodo = async (updateTodo: Todo, todoList: Todo[]): Promise<TodoResponse> => {
	const returnVal: TodoResponse = {
		success: false,
	};
	console.log("addTodo svc ==>", updateTodo);
	try {
		if (!updateTodo || !todoList) {
			throw {message: MSG.INVALID_PARAMS};
		}
		const newTodoList = todoList.map((item: Todo) => {
			const {id} = item;
			if(id === updateTodo.id) {
				return updateTodo;
			}
			return item;
		});
		await window.localStorage.setItem('Todos', JSON.stringify(newTodoList));

		returnVal.success = true;
		returnVal.data = sortTodoListByDate(newTodoList);
		returnVal.msg = MSG.UPDATE_SUCCESS;
	} catch (e) {
		console.log('--updateTodo-- error', e);
		returnVal.msg = MSG.UPDATE_FAILED;
	}
	return returnVal;
};

const sortTodoListByDate = (list: Array<Todo>): Array<Todo> => {
	return list.sort((a: { date: string; }, b: { date: string; }) => Date.parse(b.date) - Date.parse(a.date));
}