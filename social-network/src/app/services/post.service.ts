import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  createNewPost(link: string, message: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/post').push(
          {
            'link': link,
            'message': message
          }
        ).then(
          () => {
            return resolve(true);
          }, (error) => {
            return reject(error);
          }
        )
      }
    )
  }
}
