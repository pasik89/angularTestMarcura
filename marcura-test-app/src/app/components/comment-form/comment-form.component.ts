import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentType } from '../../models/costs.model';
import { v4 as uuidv4 } from 'uuid';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent implements OnInit, OnDestroy {
  @Input() costId: number;

  unsubscribe$: Subject<void> = new Subject();

  formGroup: FormGroup;
  uniqSelectId: string;

  selectOptions: { name: string, value: string }[] = [
    { name: 'Select comment type', value: '' },
    { name: CommentType.INTERNAL, value: CommentType.INTERNAL },
    { name: CommentType.EXTERNAL, value: CommentType.EXTERNAL },
  ];

  constructor(private fb: FormBuilder) {
   this.formGroup = this.fb.group({
      costId: [null],
      commentType: ['', [Validators.required]],
      comment: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.uniqSelectId = uuidv4();
    this.formGroup.patchValue({ costId: this.costId });
    this.formGroup.controls.comment.disable();


    this.formGroup.get('commentType').valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(commentTypeValue => {
      commentTypeValue
        ? this.formGroup.controls.comment.enable()
        : this.formGroup.controls.comment.disable();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit($event): void {
    $event.preventDefault();

    console.table(this.formGroup.getRawValue());
  }
}
