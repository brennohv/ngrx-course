import { isDevMode } from '@angular/core';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { compareCourses, Course } from '../model/course';
import { CoursesActions } from '../courses-types';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course>{
  hasAlreadyLoadedBefore: boolean
}

const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  // selectId: course => course.courseId
});

export const initialCoursesState:CoursesState = adapter.getInitialState({
  hasAlreadyLoadedBefore: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.allCoursesLoaded, (state, action) =>
    adapter.setAll(action.courses, {...state, hasAlreadyLoadedBefore: true}))
)

export const allFormatedCourses = adapter.getSelectors()
