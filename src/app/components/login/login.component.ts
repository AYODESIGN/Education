import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg= false
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        });

  }
  login() {
    this.usersService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response.user);
        console.log(response.msg);
        console.log(response);
        if (response.msg == "2") {
          if (response.role == 'teacher') {
            console.log(response.role);
            sessionStorage.setItem('jwt', response.user);
            swal('Success!', 'Login successful!', 'success');

            this.router.navigate(['/coursesTab']);  
          } else if (response.role == 'student') {
            sessionStorage.setItem('jwt', response.user);
            swal('Success!', 'Login successful!', 'success');

            this.router.navigate(['/student-courses']); 
          }
          else if (response.role == 'admin') {
            sessionStorage.setItem('jwt', response.user);
            swal('Success!', 'Login successful!', 'success');
            this.router.navigate(['/teachers-list']); 
          }
          else if (response.role == 'parent') {
            sessionStorage.setItem('jwt', response.user);
            swal('Success!', 'Login successful!', 'success');
            this.router.navigate(['']); 
          }
        } else if (response.msg == "Teacher is not confirmed") {
          swal('Login Failed', 'Login failed because your account is not confirmed by an admin.', 'error');
          this.errorMsg = true;
        }
      }
    );
  }
  

      }

    
    

