import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedInSelector } from "./auth.selectors";
import { tap } from "rxjs/operators";


@Injectable()

export class AuthGuard {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean > {
    return this.store.pipe(
      select(isLoggedInSelector),
      tap(loggedId => {
        if(!loggedId) {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }
}
