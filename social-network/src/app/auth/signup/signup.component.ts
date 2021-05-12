import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['', Validators.required],
      pseudo: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(4)]]
    })
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;
    const pseudo = this.signUpForm.get('pseudo').value;
    const newUser = new User(email, password, pseudo);
    if (password === confirmPassword) {
      this.userService.createNewUser(newUser);
      this.authService.createNewUser(email, password).then(
        () => {
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

}
