import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';



@Component({
  selector: 'app-add-score',
  templateUrl: './add-score.component.html',
  styleUrls: ['./add-score.component.css']
})
export class AddScoreComponent implements OnInit {
  addScoreForm: FormGroup;
  editMode= false;
  enrollments: [] 
  id:any
  errorMsg
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.selectedEnrolement(this.id);

    this.addScoreForm = this.formBuilder.group({
      evaluation: ['', [Validators.required, Validators.minLength(3)]],
      score: ['', [Validators.required, Validators.max(10)]],
      enrollmentId:[this.id]
    });
    
  }

  selectedEnrolement(id){
    this.courseService.getByEnrollementId(id).subscribe((doc)=>{
      console.log("enrolled students",doc.Enrollments)
      this.enrollments = doc.Enrollments
      console.log("enrolled ",this.enrollments)
    })
   }

   addScore(){
    console.log(this.addScoreForm.value)
    this.courseService.saveScore(this.addScoreForm.value).subscribe((response)=>{

      
      if(response.error){
        this.errorMsg = response.error
      }
      else{
        swal('Success!', 'Score added successfully!', 'success');
      }
      
    })

   }

}
