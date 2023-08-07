import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
decodedToken:any;
  students: any;
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

  deleteStudent(id) {
    this.usersService.deleteStudentById(id).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getAll();
          swal('Success!', `Student deleted successfully!`, 'success');

        }
      }
    )
  }

  getAll() {
    this.usersService.getAllStudents().subscribe((response)=>{
      console.log(response)
      this.students = response.Student
    
       })
        }
  
        assignCourse(id) {
          this.router.navigate([`assign-course/${id}`]);
        }

  goToInfo(id) {
    this.router.navigate([`veiw-student/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([``]);
  }

 
}


