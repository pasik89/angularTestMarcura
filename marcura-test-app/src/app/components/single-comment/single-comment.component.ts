import { Component, Input } from '@angular/core';
import { Comment } from '../../models/costs.model';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent {
  @Input() comment: Comment;
  editIcon = faEdit;
  deleteIcon = faTrashAlt;

  constructor() { }
}
