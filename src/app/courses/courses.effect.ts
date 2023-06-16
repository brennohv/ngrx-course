import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesActions } from "./courses-types";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesEffect {

  loadCourses$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => CoursesActions.allCoursesLoaded({courses}))
    ));

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {}
}
