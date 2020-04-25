import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './containers/posts/posts.component';
import { SelectedPostComponent } from './containers/selected-post/selected-post.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: ':slug',
    component: SelectedPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
