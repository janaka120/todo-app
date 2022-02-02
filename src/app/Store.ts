import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import TodoReducer from '../features/todo/reducer/TodoReducer';

const store = configureStore({
	reducer: {
		Todo: TodoReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
