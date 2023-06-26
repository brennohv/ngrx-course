import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

export const loadAllCourses = createAction(
  "[Courses Resolver] Load All Courses"
)

export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded ",
  props<{courses: Course[]}>()
)

export const updateCourse = createAction(
  "[update course dialog] The course was updated",
  props<{update: Update<Course>}>()
)
