import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListPostComponent } from './list-post/list-post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthComponent } from './auth/auth.component';
import { FilterPostComponent } from './filter-post/filter-post.component';
import { SearchUserComponent } from './search-user/search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListPostComponent,
    NewPostComponent,
    AuthComponent,
    FilterPostComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
