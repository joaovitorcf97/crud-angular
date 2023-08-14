import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    category: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.coursesService.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', '', { duration: 3000 });
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', { duration: 3000 });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatorio';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minLength']['requiredLength']
        : 5;

      return `Campo deve ter no mínimo ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxLength']['requiredLength']
        : 200;

      return `Campo deve ter no máximo ${requiredLength} caracteres.`;
    }

    return 'Campo inválido';
  }
}
