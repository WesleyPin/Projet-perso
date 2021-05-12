import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isSignIn: boolean = true;
  signInOrUp: string;
  messageSign: string;

  constructor() { }

  ngOnInit(): void {
    this.switchLinkSign();
  }

  switchLinkSign() {
    if (this.isSignIn) {
      this.signInOrUp = "S'inscrire";
      this.messageSign = "Vous n'êtes pas encore inscrit sur notre site ?";
    } else {
      this.signInOrUp = "Se connecter";
      this.messageSign = "Vous avez déjà un compte sur notre site ?";
    }
  }

  initMessageSign() {

  }

  switchSign() {
    this.isSignIn = !this.isSignIn;
    this.switchLinkSign();
  }

}
