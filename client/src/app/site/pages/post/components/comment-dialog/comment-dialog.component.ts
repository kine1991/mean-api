import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  @Input() currentUser;
  comment

  constructor() { }

  ngOnInit() {
  }

  leaveComment() {
    if (this.comment) {
      console.log(this.comment);
      this.comment = null;
    } else {
      alert('this.field is emply');
    }
  }

}
