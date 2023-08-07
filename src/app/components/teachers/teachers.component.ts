import { UsersService } from './../../services/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import  jwt_decode  from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  @Input() teacher: any;
    teachers: []
  constructor(
    private usersService: UsersService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersService.getAllTeachers().subscribe((response)=>{
      this.teachers = response.Teacher
    })
  }

}
