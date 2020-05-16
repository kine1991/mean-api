import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './containers/posts/posts.component';
import { SelectedPostComponent } from './containers/selected-post/selected-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
import { CardComponent } from './components/card/card.component';
import { CardTogglerComponent } from './components/card-toggler/card-toggler.component';
import { FilterComponent } from './components/filter/filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations: [
    PostsComponent,
    SelectedPostComponent,
    SimpleCardComponent,
    CardComponent,
    CardTogglerComponent,
    FilterComponent,
    PaginationComponent,
    CommentSectionComponent,
    CommentDialogComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
