import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from "rxjs";
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { AppState } from '../../reducers';
import { Store, select } from '@ngrx/store';
import { advancedCoursesSelector, allCoursesSelector, beginnerCoursesSelector, totalPromoCoursesSelector } from '../courses.selectors';
import { allFormatedCourses } from '../reducers';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    loading$: Observable<boolean>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(
      private dialog: MatDialog,
      private store: Store<AppState>,
      private coursesHttpService: CoursesHttpService) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {
    this.advancedCourses$ = this.store
      .pipe(
        select(advancedCoursesSelector)
      )

    this.beginnerCourses$ = this.store
      .pipe(
        select(beginnerCoursesSelector)
      )

    this.promoTotal$ = this.store
      .pipe(
        select(totalPromoCoursesSelector)
      )
  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
