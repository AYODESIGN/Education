import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode  from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/course';

  constructor(
    private http: HttpClient
  ) { }

  addCourse(course: any, img: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('duration', course.duration);
    formData.append('teacherId', course.teacherId);
    formData.append('img', img);
   

    return this.http.post<any>(`${this.apiUrl}/add`, formData);
  }

  getCoursesByTeacher(id){
    return this.http.get<{courses: any}>(`${this.apiUrl}/${id}`);
  }

  getCourseById(id){
    return this.http.get<{course: any}>(`${this.apiUrl}/one/${id}`);
  }

  editCourse(newCourse , img:File) {
    const formData: FormData = new FormData();
    formData.append('_id', newCourse._id);
    formData.append('name', newCourse.name);
    formData.append('description', newCourse.description);
    formData.append('duration', newCourse.duration);
    formData.append('teacherId', newCourse.teacherId);
    formData.append('img', img);
   
    return this.http.put<{ msg: string }>(this.apiUrl, formData);
  }

  deleteCourseById(id) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.apiUrl}/${id}`);
  }
  getAllCourses() {
    return this.http.get<any>( `${this.apiUrl}s`);
  }
  getLimitedCourses() {
    return this.http.get<any>( `${this.apiUrl}s/limit`);
  }
  getAllScores(){
    return this.http.get<any>( `${this.apiUrl}s/scoring`);
  }

  getAllScoresByStudent(id){
    return this.http.get<any>( `${this.apiUrl}s/scoringByStudent/${id}`);
  }
  getByEnrollementId(id){
    return this.http.get<any>( `${this.apiUrl}s/selectedEnrollement/${id}`);
  }
 
  createEnrollement(enrollment) {
    return this.http.post<any>( `${this.apiUrl}/enrollment`, enrollment);
  }
  getCourseByStudent(id){
    return this.http.get<any>( `${this.apiUrl}/enrolled/${id}`);
  }
  getALLEnrolledStudents(){
    return this.http.get<any>( `${this.apiUrl}s/allenrolled`);
  }
  selectedEnrolledStudents(id){
    return this.http.get<any>( `${this.apiUrl}s/selectedCourse/${id}`);

  }
  
  studentEnrollmentById(id){
    return this.http.get<any>( `${this.apiUrl}s/studentEnrollement/${id}`);
  }
  
  saveScore(score){
    return this.http.post<any>( `${this.apiUrl}/score`, score);
  }
  

}
