import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string)
  {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (users) => {
            resolve(users.user.uid);
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
          () => {
            return firebase.auth().signInWithEmailAndPassword(email, password).then(
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
    )
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}

