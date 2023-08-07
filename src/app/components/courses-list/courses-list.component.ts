import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  decodedToken:any;
  courses: any;
  currentUrl: string;
  constructor(
    private usersService: UsersService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAll()
  }

  deleteCourse(id) {
    this.courseService.deleteCourseById(id).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getAll();
          swal('Success!', `Course deleted successfully!`, 'success');
        }
      }
    )
  }

  getAll() {
    this.courseService.getAllCourses().subscribe((response)=>{
      console.log("response",response)
      this.courses = response.Course
    
       })
        }
  


  goToInfo(id) {
    this.router.navigate([`coursesTab`]);
  }

  goToEdit(id) {
    this.router.navigate([``]);
  }

 
}


