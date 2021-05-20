import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit, OnDestroy {

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  routeSub: Subscription;
  currentUser: User;
  isEdit: boolean;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.userService.getUserByUid(user.uid).then(
            (u: User) => {
              this.currentUser = u;
              this.currentUser.uid = user.uid;
              this.fileUrl = this.currentUser.photo;
              this.routeSub = this.route.params.subscribe(
                (url)=> {
                  if (this.currentUser.uid === url.id) {
                    this.isEdit = true;
                  } else {
                    this.isEdit = false;
                  }
              });
            }, (error) => {
              console.log('erreur de récupération.');
            }
          )
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  onSave() {
    
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
