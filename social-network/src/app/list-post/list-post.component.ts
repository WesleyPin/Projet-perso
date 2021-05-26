import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  isAddingPost: boolean;
  currentUser: User;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.userService.getUserByUid(user.uid).then(
            (u: User) => {
              this.currentUser = u;
              this.currentUser.uid = user.uid;
            }, (error) => {
              console.log('erreur de récupération.');
            }
          )
        }
      }
    );
  }

  changeStatusAdd() {
    this.isAddingPost = !this.isAddingPost;
  }

}
