import React, {FC, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {RootState} from '../../../app/Store';
import TodoList from '../components/TodoList';
import { Todo } from '../models/Todo';
import moment from 'moment';
import { createTodo, fetchTodoList } from '../actions/TodoActions';
import BaseButton from '../../../componets/BaseButton';

const TodoContainer: FC = () => {
	const dispatch = useDispatch();
	const {isInProgress} = useSelector((state: RootState) => {
		return {
			isInProgress: state.Todo.isInProgress,
		};
	}, shallowEqual);

	const [inputText, setInputText] = useState('');

	useEffect(() => {
		dispatch(fetchTodoList());
	}, []);

	const onClickHandler = () => {
		if(inputText && inputText.length > 0) {
			const uniqId = moment().unix().toString();
			const todoData: Todo = {
				id: uniqId,
				text: inputText,
				date: moment().format(),
			}
			dispatch(createTodo(todoData));
			setInputText('');
		}
	}
	
	const onChangeHandler = (e: { target: { value: string; }; }) => {
		setInputText(e.target.value);
	}

	return (
		<div className="todo_container">
			<div className="input_con">
				<input className='input_con__input' type="text" onChange={onChangeHandler} value={inputText} />
				<BaseButton styleType='primary' type="button" onClick={onClickHandler} disabled={inputText.length === 0}>Create</BaseButton>
			</div>
			<TodoList />
			<ToastContainer
				position="top-right"
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				/>
		</div>
	);
};
export default TodoContainer;
