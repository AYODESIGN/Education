import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  imagePreview: any;
  decoded: any;
  selectedFile: any;
  fileName: any;
  id: any;
  user: any;
  teacher: boolean = false;
  student: boolean = false;
  parent: boolean = false;
  admin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let token = sessionStorage.getItem("jwt");
    if (token) {
      this.decoded = this.decodeToken(token);
      console.log(this.decoded);

      // Check the decoded.role and set the corresponding role value to true
      switch (this.decoded.role) {
        case 'teacher':
          this.teacher = true;
          break;
        case 'student':
          this.student = true;
          break;
        case 'parent':
          this.parent = true;
          break;
        case 'admin':
          this.admin = true;
          break;
        default:
          break;
      }
    }

    this.imagePreview = this.decoded.img;

    this.editForm = this.formBuilder.group({
      _id: [this.decoded.userId, [Validators.required, Validators.minLength(3)]],
      firstName: [this.decoded.Fname, [Validators.required, Validators.minLength(3)]],
      lastName: [this.decoded.Lname, [Validators.required, Validators.minLength(3)]],
      address: [this.decoded.add, [Validators.required, Validators.minLength(5)]],
      img: [this.imagePreview],
      role: [this.decoded.role]
    });
  }

  editProfile() {
    console.log("loging the form", this.editForm.value);

    // Determine which user role is being edited and call the appropriate service method
    switch (this.decoded.role) {
      case 'teacher':
        this.usersService.editTeacher(this.editForm.value, this.editForm.value.img).subscribe(
          (response) => {
            console.log("Response after update from BE", response.msg);
          }
        );
        break;
      case 'parent':
        this.usersService.editParent(this.editForm.value, this.editForm.value.img).subscribe(
          (response) => {
            console.log("Response after update from BE", response.msg);
          }
        );
        break;
      case 'student':
        this.usersService.editStudent(this.editForm.value, this.editForm.value.img).subscribe(
          (response) => {
            console.log("Response after update from BE", response.msg);
          }
        );
        break;
      case 'admin':
        this.usersService.editAdmin(this.editForm.value, this.editForm.value.img).subscribe(
          (response) => {
            console.log("Response after update from BE", response.msg);
          }
        );
        break;
      default:
        break;
    }

    swal('Success!', `User edited successfully!`, 'success');
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({ img: file });
    this.editForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }
}
