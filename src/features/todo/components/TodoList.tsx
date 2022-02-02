import React, {FC, useMemo} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../app/Store';
import { Todo } from '../models/Todo';
import ListItem from './TodoListItem';

const TodoList: FC = () => {
	const {isInProgress, todoList} = useSelector((state: RootState) => {
		return {
			isInProgress: state.Todo.isInProgress,
			todoList: state.Todo.todoList,
		};
	}, shallowEqual);

	const listTitle = useMemo(() => {
		const count = todoList.length;
		return count > 0 ? `No. of Todo items ${count}` : 'Start by adding new todo'; 
	}, [todoList.length]);

	return (
		<div className="todo_list_container">
			<span className='todo_list_title'>{listTitle}</span>
			<ul className='todo_list'>
				{
					todoList.map((item: Todo) => {
						return <li key={item.id} ><ListItem id={item.id} text={item.text} date={item.date} /></li>
					})
				}
			</ul>
		</div>
	);
};
export default TodoList;
