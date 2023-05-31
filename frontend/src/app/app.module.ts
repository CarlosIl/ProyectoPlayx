import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './auth/register/register.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PostCardComponent } from './post-card/post-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module/material-module.module';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UserCardComponent } from './user-card/user-card.component';
import { SearchComponent } from './search/search.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowingsSiteComponent } from './followings-site/followings-site.component';
import { PostFinalComponent } from './post-final/post-final.component';
import { PostCeroComponent } from './post-cero/post-cero.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { PostComponent } from './post/post.component';
import { SidenavMobileComponent } from './sidenav-mobile/sidenav-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ModalComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
    PostCardComponent,
    ProfileComponent,
    CreatePostComponent,
    UserCardComponent,
    SearchComponent,
    EditProfileComponent,
    FollowingsSiteComponent,
    PostFinalComponent,
    PostCeroComponent,
    NotificationCardComponent,
    PostComponent,
    SidenavMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
