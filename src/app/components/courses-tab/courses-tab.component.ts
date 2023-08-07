import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css']
})
export class CoursesTabComponent implements OnInit {
  decodedToken:any;
  courses: any;
  currentUrl: string;
  teachers:[]
  enrollments:[] = []
  constructor(
    private UsersService: UsersService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getALLEnrolledStudents()
    let token = sessionStorage.getItem("jwt")
    if(token){
      this.decodedToken = this.decodeToken(token)
      this.getAll();
    }
    this.currentUrl = window.location.pathname;

    if (this.currentUrl == '/coursesTab/edited') {
      this.getAll();
    }
    if (this.currentUrl == '/coursesTab/added') {
      this.getAll();
    }

   }


  decodeToken(token:string){
    return jwt_decode(token);
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
    this.courseService.getCoursesByTeacher(this.decodedToken.userId).subscribe((response)=>{
      console.log(response.courses)
      this.courses = response.courses
    
       })
        }
  


  goToInfo(id) {
    
    this.router.navigate([`veiw-courses/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([`edit-course/${id}`]);
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
scores(id){
  this.router.navigate([`scores/${id}`]);
}
}



