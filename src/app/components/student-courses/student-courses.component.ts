import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  decodedToken:any;
  courses: any;
  currentUrl: string;
  scoreTab: []
  constructor(
    private usersService: UsersService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getAll()
    let token = sessionStorage.getItem("jwt")
    if(token){
      console.log('there is a token')
      this.decodedToken = this.decodeToken(token)
      console.log(this.decodedToken.userId);
      
      this.studentEnrollmentById(this.decodedToken.userId)
      this.getAllScores()
    }
  }

  

  // getAll() {
  //   this.courseService.getAllCourses().subscribe((response)=>{
  //     console.log("response",response)
  //     this.courses = response.Course
    
  //      })
  //       }

  studentEnrollmentById(id){
          this.courseService.studentEnrollmentById(id).subscribe((response)=>{
            console.log("response",response.Enrollments)
            this.courses = response.Enrollments
          
             })

        }

        getAllScores(){
          this.courseService.getAllScores().subscribe((doc)=>{
            console.log("all scores",doc.scores)
            this.scoreTab = doc.scores
          })
         }
        


  goToInfo(id) {
    this.router.navigate([`coursesTab`]);
  }

  goToEdit(id) {
    this.router.navigate([``]);
  }

  decodeToken(token:string){
    return jwt_decode(token);
  }
 
}
