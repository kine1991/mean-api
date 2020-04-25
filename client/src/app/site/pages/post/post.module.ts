import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './containers/posts/posts.component';
import { SelectedPostComponent } from './containers/selected-post/selected-post.component';



@NgModule({
  declarations: [PostsComponent, SelectedPostComponent],
  imports: [
    CommonModule
  ]
})
export class PostModule { }
