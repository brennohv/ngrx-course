import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
    ), {dispatch: false}
  )

  constructor(private actions$: Actions) {}
}
