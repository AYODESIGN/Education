import { AssignCourseComponent } from './components/assign-course/assign-course.component';
import { NgModule,  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegisterAsComponent } from './components/register-as/register-as.component';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { ScoresComponent } from './components/scores/scores.component';
import { AddScoreComponent } from './components/add-score/add-score.component';
import { VeiwChildComponent } from './components/veiw-child/veiw-child.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { CourseComponent } from './components/course/course.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';




const routes: Routes = [
  {path: "", component: HomeComponent },
  {path: "header", component: HeaderComponent},
  {path: "signup", component: SignupComponent},
  {path: "signup/student", component: SignupComponent},
  {path: "signup/parent", component: SignupComponent},
  {path: "signup/teacher", component: SignupComponent},
  {path: "signup/admin", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "register-as", component: RegisterAsComponent},
  {path: "add-course", component: AddCourseComponent},
  {path: "edit-course/:id", component: AddCourseComponent},
  {path: "veiw-courses", component: ViewCoursesComponent},
  {path: "veiw-courses/:id", component: ViewCoursesComponent},
  {path: "coursesTab", component: CoursesTabComponent},
  {path: "coursesTab/edited", component: CoursesTabComponent},
  {path: "coursesTab/added", component: CoursesTabComponent},
  {path: "teachers-list", component: TeachersListComponent},
  {path: "students-list", component: StudentsListComponent},
  {path: "courses-list", component: CoursesListComponent},
  {path: "assign-course/:id", component: AssignCourseComponent},
  {path: "student-courses", component: StudentCoursesComponent},
  {path: "scores/:id", component: ScoresComponent},
  {path: "add-score/:id", component: AddScoreComponent},
  {path: "view-child", component: VeiwChildComponent},
  {path: "search-teacher", component: SearchTeacherComponent},
  {path: "teachers", component: TeachersComponent},
  {path: "course", component: CourseComponent},
  {path: "edit-profile", component: EditProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
