import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, allFormatedCourses } from "./reducers";


export const selectCourses = createFeatureSelector<CoursesState>("courses")

export const allCoursesSelector = createSelector(
  selectCourses,
  allFormatedCourses.selectAll
)

export const beginnerCoursesSelector = createSelector(
  allCoursesSelector,
  (courses) => courses.filter(course =>  course.category == 'BEGINNER')
)

export const advancedCoursesSelector = createSelector(
  allCoursesSelector,
  (courses) => courses.filter(course =>  course.category == 'ADVANCED')
)

export const totalPromoCoursesSelector = createSelector(
  allCoursesSelector,
  (courses) => courses.filter(course =>  course.promo ).length
)

export const hasAlreadyLoadedBefore = createSelector(
  selectCourses,
  (state) => state.hasAlreadyLoadedBefore
)
