import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowingsSiteComponent } from './followings-site/followings-site.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { UsersComponent } from './admin/users/users.component';
import { ModifyComponent } from './admin/users/modify/modify.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'follows', component:FollowingsSiteComponent},
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'edit_profile', component:EditProfileComponent},
  { path: 'post/:id', component:PostComponent},
  //Mobile
  { path: 'search', component: SearchComponent },
  { path: 'create', component: CreatePostComponent},
  { path: 'create/:id', component: CreatePostComponent},
  //Admin
  { path: 'users', component: UsersComponent},
  { path: 'edit/:id', component:ModifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
