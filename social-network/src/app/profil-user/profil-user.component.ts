import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  // onUploadFile(file: File) {
  //   this.fileIsUploading = true;
  //   console.log('upload', file);
  //   this.booksService.uploadFile(file).then(
  //     (url: string) => {
  //       console.log('file', url);
  //       this.fileUrl = url;
  //       this.fileIsUploading = false;
  //       this.fileUploaded = true;
  //     }
  //   )
  // }

  // detectFiles(event) {
  //   this.onUploadFile(event.target.files[0]);
  // }
}
