import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPostComponent } from './containers/main-post/main-post.component';
import { CreatePostComponent } from './containers/create-post/create-post.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { ShowSinglePostComponent } from './containers/show-single-post/show-single-post.component';
import { EditPostComponent } from './containers/edit-post/edit-post.component';


const routes: Routes = [
  {
    path: '',
    component: MainPostComponent
  },
  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: ':slug',
    component: ShowSinglePostComponent
  },
  {
    path: ':slug/edit',
    component: EditPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
  // {
  //   path: '',
  //   component: BooksComponent
  // },
  // {
  //   path: 'page-not-found',
  //   component: PageNotFoundComponent
  // },
  // {
  //   path: ':slug',
  //   component: SelectedBookComponent
  // }