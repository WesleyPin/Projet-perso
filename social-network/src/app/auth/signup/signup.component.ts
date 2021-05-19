import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    firebase.storage().ref().child('images/alpha-logo.gif').getDownloadURL().then(
      (url) => {
        this.fileUrl = url;
      }
    );
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['', Validators.required],
      pseudo: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(4)]],
      picture: ['']
    })
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;
    const pseudo = this.signUpForm.get('pseudo').value;
    const newUser = new User(email, password, pseudo, this.fileUrl);
    if (password === confirmPassword) {
      this.authService.createNewUser(email, password).then(
        (u: string) => {
          this.userService.createNewUser(newUser, u);
          this.router.navigate(['/list-post']);
        },
        (error) => {
          this.errorMessage = error;
        }
      )
    } else {
      this.errorMessage = "Les deux mots de passe sont différents, veuillez correctement valider votre mot de passe.";
    }

  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    console.log('upload', file);
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
