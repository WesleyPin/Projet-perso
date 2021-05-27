import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;
  @Output() newPostEvent = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      link: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  reinitForm () {
    
  }

  onAddPost() {
    const link = this.newPostForm.get('link').value;
    const message = this.newPostForm.get('message').value;
    this.postService.createNewPost(link, message).then(
      () => {
        this.newPostEvent.emit(false);
      }, (error) => {
        
      }
    )
  }
}
