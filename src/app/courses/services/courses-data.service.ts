import { Injectable } from "@angular/core";
import { DefaultDataService, EntityDispatcher, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { HttpOptions } from "@ngrx/data/src/dataservices/interfaces";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Update } from "@ngrx/entity";

@Injectable({
  providedIn: 'root',
})

export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
      super('Course', http, httpUrlGenerator)
  }

  getAll(options?: HttpOptions): Observable<Course[]> {
      return this.http.get<{payload: Course[]}>('/api/courses')
        .pipe(map(res => res.payload))
  }

  update(update: Update<Course>, options?: HttpOptions): Observable<Course> {


      return this.http.put<Course>('api/course/' + update.id, update.changes)
        .pipe(
          tap(() => alert('Course was updated succesfully')),
          catchError((err) => {
            return throwError(err);
          })
        )
  }
}
