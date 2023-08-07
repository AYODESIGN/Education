import  jwt_decode  from 'jwt-decode';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm: FormGroup;
  imagePreview: any;
  id: any;
  title: string = "Add Course";
  courses: any;
  editMode:boolean = false;
  image: any 
  constructor( private formBuilder: FormBuilder,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    let token = sessionStorage.getItem("jwt")
    let decodedToken:any = jwt_decode(token)
    console.log(decodedToken.userId)
 this.id = this.activatedRoute.snapshot.paramMap.get("id")
 if (this.id){
  this.editMode = true
  this.title = "Edit Course"
  this.courseService.getCourseById(this.id).subscribe((response)=>{
    console.log(response)
      this.courses = response.course
      this.imagePreview = this.courses.img
      this.addCourseForm = this.formBuilder.group({
        name: [this.courses.name, [Validators.required, Validators.minLength(3)]],
        description: [this.courses.description, [Validators.required, Validators.minLength(3)]],
        duration: [this.courses.duration, [Validators.required, Validators.minLength(3)]],
        teacherId: [decodedToken.userId, [Validators.required]],
        _id: [this.id, [Validators.required]],
        img: [this.imagePreview],
      });
    
  })
 }
    
    this.addCourseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', [Validators.required, Validators.minLength(3)]],
      teacherId: [decodedToken.userId, [Validators.required]],
      img: [''],
    });
  
  }

  addCourse(){
    console.log("HERE OBJECT", this.addCourseForm.value);
    this.courseService.addCourse(this.addCourseForm.value , this.addCourseForm.value.img).subscribe();
    swal('Success!', `Course ${this.addCourseForm.value.name} added successfully!`, 'success')
    }

   edit() {
    console.log("loging the form",this.addCourseForm.value)
    this.courseService.editCourse(this.addCourseForm.value , this.addCourseForm.value.img).subscribe(
      (response) => {
        console.log("Here response after upddate from BE", response.msg);
      }
    )
    swal('Success!', `Course ${this.addCourseForm.value.name} edited successfully!`, 'success')
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addCourseForm.patchValue({ img: file });
    this.addCourseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }


  
}
