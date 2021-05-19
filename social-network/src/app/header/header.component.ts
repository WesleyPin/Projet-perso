import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  currentUser: User;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.userService.getUserByUid(user.uid).then(
            (u: User) => {
              this.currentUser = u;
              this.currentUser.uid = user.uid;
            }, (error) => {
              console.log('erreur de récupération.');
            }
          )
        } else {
          this.isAuth = false;
        }
      }
    );
  }

}
