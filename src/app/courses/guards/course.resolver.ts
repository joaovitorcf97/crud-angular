import { Course } from './../model/course';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  const coursesService = inject(CoursesService);

  if (route.params && route.params['id']) {
    return coursesService.findCourseById(route.params['id']);
  }

  return { _id: '', name: '', category: '' };
};
