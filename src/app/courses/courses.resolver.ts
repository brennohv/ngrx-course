import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store } from "@ngrx/store";
import { first, tap } from "rxjs/operators";
import { loadAllCourses } from "./courses.actions";
import { Injectable } from "@angular/core";
import { CoursesActions } from "./courses-types";

@Injectable({
  providedIn: 'root'
})

export class CoursesResolver {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this.store
        .pipe(
          first(),
          tap(() => {
            this.store.dispatch(CoursesActions.loadAllCourses())
          })
        )
    }
}
