import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import { filter, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./courses.actions";
import { Injectable } from "@angular/core";
import { CoursesActions } from "./courses-types";
import { hasAlreadyLoadedBefore } from "./courses.selectors";

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
          select(hasAlreadyLoadedBefore),
          tap((hasLoaded) => {
            if(!hasLoaded) {
              this.store.dispatch(CoursesActions.loadAllCourses())
            }
          })
        )
    }
}
