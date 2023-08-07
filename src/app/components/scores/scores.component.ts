import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
id : string
enrollments : [];
scoreTab: [];



  constructor(
 
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.scores(this.id)
    console.log(this.enrollments)
    this.getAllScores()

  }
  scores(id){
    this.courseService.selectedEnrolledStudents(id).subscribe((doc)=>{
      console.log("enrolled students ",doc.Enrollments)
      this.enrollments = doc.Enrollments
    })
   }

   getAllScores(){
    this.courseService.getAllScores().subscribe((doc)=>{
      console.log("all scores",doc.scores)
      this.scoreTab = doc.scores
    })
   }

   addScore(id){
    this.router.navigate([`add-score/${id}`]);
   }

   
   
}
