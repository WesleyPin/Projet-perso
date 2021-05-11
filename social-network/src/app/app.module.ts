import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListPostComponent } from './list-post/list-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { FilterPostComponent } from './filter-post/filter-post.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes =  [
  { path: 'list-post', canActivate: [AuthGuardService], component: ListPostComponent },
  { path: 'new-post', canActivate: [AuthGuardService], component: NewPostComponent },
  { path: 'search-user', canActivate: [AuthGuardService], component: SearchUserComponent },
  { path: 'profil-user/:id', canActivate: [AuthGuardService], component: SearchUserComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '', redirectTo: 'list-post', pathMatch: 'full' },
  { path: '**', redirectTo: 'list-post' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListPostComponent,
    NewPostComponent,
    SigninComponent,
    SignupComponent,
    FilterPostComponent,
    SearchUserComponent,
    ProfilUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
