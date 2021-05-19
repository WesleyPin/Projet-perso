import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  createNewUser(user: User, uid: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('user/' + uid).set({
          pseudo: user.pseudo,
          email: user.email,
          photo: user.photo
        }).then(
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

  getUserByUid(uid: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('user/' + uid).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => { 
            console.log('Chargement ...') 
          }, (error) => { 
            console.log('Erreur de chargement : ' + error); reject() 
          }, () => {
            resolve(firebase.storage().ref().child('images/' + almostUniqueFileName + file.name).getDownloadURL());
          } 
        );
      }
    )
  }

}
