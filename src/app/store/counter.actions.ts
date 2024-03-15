import { createAction, props } from '@ngrx/store';

export const init = createAction('[Counter] Init');

export const set = createAction('[Counter] Set', props<{ value: number }>());

export const increment = createAction(
  '[Counter] Increment',
  props<{ value: number }>()
);

export const decrement = createAction(
  '[Counter] Decrement',
  props<{ value: number }>()
);

export const clear = createAction('[Counter] Clear');
