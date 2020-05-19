import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import * as PostActions from '../../store/post.actions';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  public currentUser;
  public reviews;
  @Input() postId;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.select('auth').subscribe(auth => {
      // console.log('auth', auth);
      this.currentUser = auth.currentUser;
    });

    this.store.dispatch(new PostActions.FetchCommentsByPostStart(this.postId));

    this.store.select('post').subscribe(post => {
      // console.log('reviews', post.reviews);
      this.reviews = post.reviews;
    });

    // console.log('post@@', this.post._id);
  }

}
