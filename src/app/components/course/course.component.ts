import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

 
    @Input() course: any;
      courses: []

    constructor(
      
      private courseService: CourseService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) { }
  
    ngOnInit() {
      this.getAllCourses()
    }
    getAllCourses(){
      this.courseService.getAllCourses().subscribe((response)=>{
        this.courses = response.Course
      })
    }
  
  }

 