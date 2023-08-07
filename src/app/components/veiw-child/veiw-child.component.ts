import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-veiw-child',
  templateUrl: './veiw-child.component.html',
  styleUrls: ['./veiw-child.component.css']
})
export class VeiwChildComponent implements OnInit {
 
  decodedToken:any;
  courses: any;
  currentUrl: string;
  scoreTab: []
  parent:any
  studentId: any ;
  invalidPhoneMsg=''
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
      console.log('there is a token', this.decodeToken(token))
     this.parent = this.decodeToken(token)
     console.log('there is a token', this.parent.childPhone)
    //  this.getStudentByNumber(this.parent.childPhone)
     
    //  this.studentEnrollmentById()
      this.getAllScores()
    }
  }

  // getStudentByNumber(phone){
  //    this.usersService.getStudentByChildPhone(phone).subscribe((response)=>{
  //               console.log("response",response.Student._id)
  //             this.studentId = response.Student._id
  //             this.studentEnrollmentById(this.studentId)
  //             })}

  getStudentByNumber(phone) {
    this.usersService.getStudentByChildPhone(phone).subscribe(
      (response) => {
        if (response.Student) {
          this.invalidPhoneMsg= `Student Name: ${response.Student.firstName}`
          console.log("response", response.Student._id);
          this.studentId = response.Student._id;
          this.studentEnrollmentById(this.studentId);
        } else {
          console.log("Invalid phone number");
        this.invalidPhoneMsg = 'Invalid phone number'
        this.courses = [];
        }
      },
    );
  }
  

  
  studentEnrollmentById(id){
          this.courseService.studentEnrollmentById(id).subscribe((response)=>{
            console.log("response",response.Enrollments)
            this.courses = response.Enrollments
             })}

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