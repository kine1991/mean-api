import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './containers/posts/posts.component';
import { SelectedPostComponent } from './containers/selected-post/selected-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PostsComponent,
    SelectedPostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
