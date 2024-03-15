import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set, clear } from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}

  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),

      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter }));
        }
        return of(set({ value: 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement, clear),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(`Action`, action);

          if (action.type === clear.type) {
            localStorage.removeItem('count');
          } else {
            localStorage.setItem('count', counter.toString());
          }
        })
      ),
    { dispatch: false }
  );
}
