import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { CourseEntityService } from "./services/courses-entity.service";

@Injectable({
  providedIn: 'root'
})

export class CoursesResolver {

  constructor(private coursesService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this.coursesService.getAll().pipe(
        map(courses => !!courses)
      )
    }
}
