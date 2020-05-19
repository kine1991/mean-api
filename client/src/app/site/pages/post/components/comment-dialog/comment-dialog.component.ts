import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import * as PostActions from '../../store/post.actions';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  @Input() currentUser;
  @Input() postId;
  @Output() emitAfterPostCreated = new EventEmitter();
  comment: string;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
  }

  leaveComment() {
    if (this.comment) {
      console.log(this.comment);
      this.store.dispatch(new PostActions.CreateCommentStart(this.postId, this.comment));
      this.comment = null;
      this.emitAfterPostCreated.emit();
    } else {
      alert('this.field is emply');
    }
  }

}
