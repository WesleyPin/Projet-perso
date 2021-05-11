import { Component } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDvznYhV3fdzW1-yiyvJVsmYSs-JdI1pdQ",
      authDomain: "social-network-d6e79.firebaseapp.com",
      projectId: "social-network-d6e79",
      storageBucket: "social-network-d6e79.appspot.com",
      messagingSenderId: "344033441253",
      appId: "1:344033441253:web:da696bb13aaa6a04d9eb0c",
      measurementId: "G-WKLDXGF8QC"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
