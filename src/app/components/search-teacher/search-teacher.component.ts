import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  specialty: string;
  teachers: [] = [];

  constructor(
        private usersService: UsersService,

  ) { }

  ngOnInit() {
    this.getAll()
  }
  getAll() {
    this.usersService.getAllTeachers().subscribe((response)=>{
      console.log(response)
      this.teachers = response.Teacher
    
       })
        }

      teachersBySearch(specialty){
        this.usersService.searchTeacher(specialty).subscribe((response)=>{
          console.log(response)
          this.teachers = response.foundedTeachers
        
           })
            }

 }