import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';



@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {
  decodedToken:any;
  teachers: any;
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

  confirmTeacher(id,teacherStatus){
    let teacherStat :string
if (teacherStatus == "Not Confirmed") {
  teacherStat = "Confirmed"
} else{
  teacherStat = "Not Confirmed"
}
console.log("teacher status", teacherStat)
    this.usersService.confirmTeacher(id,teacherStat).subscribe(
      (response) => {
        if (response) {
          this.getAll();
        }
      }
    )
  }
  

  deleteCourse(id) {
    this.usersService.deleteTeacherById(id).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getAll();
          swal('Success!', `Teacher deleted successfully!`, 'success');

        }
      }
    )
  }

  getAll() {
    this.usersService.getAllTeachers().subscribe((response)=>{
      console.log(response)
      this.teachers = response.Teacher
    
       })
        }
  


  goToInfo(id) {
    this.router.navigate([`veiw-courses/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([`edit-course/${id}`]);
  }

 
}

