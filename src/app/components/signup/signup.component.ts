import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



interface StudentResponse {
  studentNumbers: { _id: string; phone: string }[];
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:string = "Admin Registration"
  //form Id
  signupForm: FormGroup;
  imagePreview: any;
  pdfPreview: any;
  selectedFile: any;
  fileName: any;
  id: any
  user: any
// current url by boolean
  currentUrl: String
  teacher = false
  parent = false
  student = false
  admin = false
  studentsPhones= []
  studentsNumber:any
  childParentPhoneErorr:string
  
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
      this.currentUrl = window.location.pathname;
      console.log(this.currentUrl);
  ////////////// Teacher ///////////////////
      if (this.currentUrl === '/signup/teacher') {
        this.teacher = true;
        this.title = 'Teacher Registration';
        this.signupForm = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
          specialty: ['', [Validators.required, Validators.minLength(3)]],
          address: ['', [Validators.required, Validators.minLength(5)]],
          phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
          img: [''],
          cv: ['', [Validators.required]],
          role: ['teacher'],
          status: ['Not Confirmed']
        });
        ////////////// Student ///////////////////
      } else if (this.currentUrl === '/signup/student') {
        this.student = true;
        this.title = 'Student Registration';
        console.log('student', this.title);
        this.signupForm = this.formBuilder.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
          address: ['', [Validators.required, Validators.minLength(5)]],
          phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
          img: [''],
          role: ['student']
        });
        ////////////// Admin ///////////////////
      }else if (this.currentUrl === '/signup/admin') {
          this.admin = true;
          console.log('student', this.title);
          this.signupForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
            pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            role: ['admin']
          });
          ////////////// Parent ///////////////////
      } else if (this.currentUrl === '/signup/parent') {
        this.title = 'Parent Registration';
        console.log('parent title', this.title);
  
        this.usersService.getAllStudentsPhoneNumbers().subscribe((response: StudentResponse) => {
          console.log('logging response.student', response.studentNumbers.length);
          for (let i = 0; i < response.studentNumbers.length; i++) {
            const studentNumber = response.studentNumbers[i].phone;
            this.studentsPhones.push(studentNumber);
          }
          console.log(this.studentsPhones);
  
          this.parent = true; // Set parent to true inside the subscription block
          this.signupForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
            childPhone: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
            role: ['parent']
          });
  
          console.log(this.parent); // Log parent value here
        });
      }
    }
  
  
    
  signup(){
    console.log("HERE OBJECT", this.signupForm.value);
   if (this.teacher) {
    this.usersService.signupTeacher(this.signupForm.value , this.signupForm.value.img , this.signupForm.value.cv).subscribe();
    this.router.navigate(['/login']);  
  }
   else if (this.student){
    this.usersService.signupStudent(this.signupForm.value , this.signupForm.value.img).subscribe();
    this.router.navigate(['/login']); 
  }
  else if (this.admin){
   this.usersService.signupAdmin(this.signupForm.value).subscribe();
   this.router.navigate(['/login']); 
  } else if (this.parent) {
    let isChildPhoneValid = false; // Flag variable
    
    for (let i = 0; i < this.studentsPhones.length; i++) {
      console.log(this.signupForm.value.childPhone);
        console.log(this.studentsPhones[i]);
      if (this.signupForm.value.childPhone === this.studentsPhones[i]) {
        
        this.usersService.signupParent(this.signupForm.value).subscribe();
        isChildPhoneValid = true; // Set the flag to true
        this.router.navigate(['/login']); 
        break;
      }
    }
    if (!isChildPhoneValid) {
      this.childParentPhoneErorr = "Please check your child's phone number";
    }
  }
  
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    console.log(this.imagePreview)

    };
    reader.readAsDataURL(file);
  }


  onFileChange(event: Event) {
    if (this.teacher) {
      const file = (event.target as HTMLInputElement).files[0];
      this.signupForm.patchValue({ cv: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      
      reader.onload = () => {
        this.pdfPreview = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        console.log(this.pdfPreview);
      };
  
      reader.readAsDataURL(file);
      this.fileName = file.name;
    }
  }
  

  }


