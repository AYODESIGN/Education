import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {
  students:any
  teachers:any
  courses:any
  filteredCourses = [];
  selectedTeacher: string;
  selectedStudent: string;
  student: any = {};
  studentCourses: any[] = [];
  constructor(  private usersService: UsersService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
   
    this.getAllTeachers()
    this.getAllCourses()
      this.selectedStudent = this.activatedRoute.snapshot.paramMap.get("id")
      this.enrolledCourseByStudent()
      this.getByIdStudent() 

  }

          getByIdStudent() {
            this.usersService.getByIdStudent(this.selectedStudent).subscribe((response)=>{
              console.log(response)
              this.student = response.Student
            
               })
              }
               getAllTeachers() {
                this.usersService.getAllTeachers().subscribe((response)=>{
                  console.log(response)
                  this.teachers = response.Teacher
                
                   })
                  }
                   getAllCourses() {
                    this.courseService.getAllCourses().subscribe((response)=>{
                      console.log(response)
                      this.courses = response.Course      
                       })}

                       filterCoursesByTeacher() {
                        this.filteredCourses = this.courses.filter(course => course.teacherId === this.selectedTeacher);
                      }
                      
                      
                      assignStudent(courseId: string, studentId: string) {
                        const enrollment = {
                          courseId: courseId,
                          studentId: studentId,
                        }; console.log(enrollment)
                        this.courseService.createEnrollement(enrollment).subscribe(
                          (response) => {
                            console.log(response)
                            if (response.message == "Added with success") {
                              this.enrolledCourseByStudent();
                            }
                          }
                        )
                      }
 

 enrolledCourseByStudent() {
  console.log(this.selectedStudent)
  this.courseService.getCourseByStudent(this.selectedStudent).subscribe((response)=>{
    console.log("enrolled student courses",response)
    this.studentCourses = response.enrolledCourses
    console.log(this.studentCourses)
  
     })
      }


 }