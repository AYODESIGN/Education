import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RegisterAsComponent } from './components/register-as/register-as.component';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { AssignCourseComponent } from './components/assign-course/assign-course.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { ScoresComponent } from './components/scores/scores.component';
import { AddScoreComponent } from './components/add-score/add-score.component';
import { VeiwChildComponent } from './components/veiw-child/veiw-child.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CourseComponent } from './components/course/course.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    FooterComponent,
    RegisterAsComponent,
    LoginComponent,
    AddCourseComponent,
    ViewCoursesComponent,
    CoursesTabComponent,
    TeachersListComponent,
    StudentsListComponent,
    CoursesListComponent,
    AssignCourseComponent,
    StudentCoursesComponent,
    ScoresComponent,
    AddScoreComponent,
    VeiwChildComponent,
    SearchTeacherComponent,
    TeachersComponent,
    CourseComponent,
    EditProfileComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
