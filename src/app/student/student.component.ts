import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from './Student.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      (res) => {
        console.log(res);
        this.students =res
      },
      (error) => {
        console.error("student"+"error");
        this.authService.isUserLoggedIn.next(false);
      
      }
    );
  }
}
