import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  createNewUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('user').push(user).then(
          () => {
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }




}
