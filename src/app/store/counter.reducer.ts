import { createReducer, on } from '@ngrx/store';
import { decrement, increment, set, clear } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value),
  on(clear, () => initialState)
);
