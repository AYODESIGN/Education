import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {
  decodedToken:any;
  courses: any;
  teachers:any
  foundTeacher:any
  id: string;
  routeParamsId: string
  displayOne =false
  filteredCourses=[]
  enrollments =[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private UsersService: UsersService,

  ) { }


    ngOnInit() {
      let token = sessionStorage.getItem("jwt");
      if (token) {
        this.decodedToken = this.decodeToken(token);
      }
    
      this.id = this.activatedRoute.snapshot.paramMap.get("id");
      if (this.id) {
        console.log('here into id router', this.id);
        this.displayOne = true;
        this.courseService.getCoursesByTeacher(this.decodedToken.userId).subscribe((response) => {
          this.courses = response.courses;
          console.log(this.courses[0]._id)
          this.filterCoursesById();
        });
    
        this.UsersService.getTeacherById(this.decodedToken.userId).subscribe((teacher) => {
          this.teachers = teacher.Teacher;
          console.log(teacher.Teacher);
        });
      } else {
        this.displayOne = false;
        this.courseService.getCoursesByTeacher(this.decodedToken.userId).subscribe((response) => {
          this.courses = response.courses;
          this.UsersService.getTeacherById(this.decodedToken.userId).subscribe((teacher) => {
            this.teachers = teacher.Teacher;
            console.log(teacher.Teacher);
          });
        });
      }
    
      console.log(this.displayOne);
      this.getALLEnrolledStudents()
    }
    
    filterCoursesById() {
      this.courses = this.courses.filter(course => course._id == this.id);
      console.log(this.courses)
    }

    getALLEnrolledStudents(){
      this.courseService.getALLEnrolledStudents().subscribe((doc)=>{
        console.log("enrolled students ",doc)
        this.enrollments = doc.Enrollments
      })
     }

    getEnrollmentCount(id: any):any {
      return this.enrollments.filter((enrollment) => enrollment['courseId'] === id).length;
      
    }
    
    decodeToken(token: string) {
      return jwt_decode(token);
    }
    
 }