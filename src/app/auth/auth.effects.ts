import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
    ), {dispatch: false}
  )

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logoutAction),
    tap(() => {
      localStorage.removeItem('user')
      this.router.navigateByUrl('/login')
    })
  ), {dispatch: false})

  constructor(private actions$: Actions, private router: Router) {}
}
