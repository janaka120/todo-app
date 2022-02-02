import React, {FC, useState} from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteTodo, updateTodo } from '../actions/TodoActions';
import { Todo } from '../models/Todo';
import BaseButton from '../../../componets/BaseButton';

const ListItem: FC<Todo> = (props: Todo) => {
	const { id, text, date } = props;
	const [isEditMode, setIsEditMode] = useState(false);
	const [updatedText, setUpdatedText] = useState(text);
	const formattedDateTime = moment(date).format('MMM Do YY, h:mm a')
	const onEditHandler = () => {
		setIsEditMode(true);
	};
	const dispatch = useDispatch();
	const onSaveHandler = () => {
		const updatedData = {
			id, 
			date: moment().format(),
			text: updatedText,
		};
		dispatch(updateTodo(updatedData));
		setIsEditMode(false);
	};
	const onCancelHandler = () => {
		setIsEditMode(false);
	};
	const onDeleteHandler = () => {
		dispatch(deleteTodo(id));
	};

	const onInputChangeHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setUpdatedText(e.target.value);
	}
	return (
		<div className='todo-item'>
			<div className='todo-item__top'>
				{isEditMode ? <input className='update_input' onChange={onInputChangeHandler} value={updatedText}/> : <span className='title'>{text}</span>}
				<span className='date'>{formattedDateTime}</span>
			</div>
			<div className='todo-item__bottom'>
				{!isEditMode && <BaseButton styleType='primary' onClick={onEditHandler}>Edit</BaseButton>}
				{isEditMode && <BaseButton styleType='primary' onClick={onSaveHandler}>Save</BaseButton>}
				<span className='space' />
				{isEditMode && <BaseButton styleType='default' onClick={onCancelHandler}>Cancel</BaseButton>}
				{!isEditMode && <BaseButton styleType='danger' onClick={onDeleteHandler}>Delete</BaseButton>}
			</div>
		</div>
	);
}

export default ListItem;