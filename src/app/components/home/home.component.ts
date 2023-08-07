import { UsersService } from './../../services/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private courseService: CourseService,

  ) { }

teachers: any[]
courses: any[]

  ngOnInit() {
    this.usersService.getLimitedTeachers().subscribe((response)=>{
      this.teachers = response.Teacher
    })
    this.getLimitedCourses()
    }
  

    getLimitedCourses(){
    this.courseService.getLimitedCourses().subscribe((response)=>{ 
      this.courses = response.Course
    })
  }
  
  
}

