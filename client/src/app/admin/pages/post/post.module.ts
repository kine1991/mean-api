import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { CreatePostComponent } from './containers/create-post/create-post.component';
import { EditPostComponent } from './containers/edit-post/edit-post.component';
import { MainPostComponent } from './containers/main-post/main-post.component';
import { ShowSinglePostComponent } from './containers/show-single-post/show-single-post.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CreatePostComponent,
    EditPostComponent,
    MainPostComponent,
    ShowSinglePostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
