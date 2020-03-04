import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PromptDialogData } from '../../interfaces';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromptDialogData) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close({ event: this.data.noButton });
  }
  onYesClick() {
    this.dialogRef.close({ event: this.data.yesButton });
  }

}
