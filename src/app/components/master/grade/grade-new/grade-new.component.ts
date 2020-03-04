import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GradeService } from "../../../../core/services/gradeservice";
import { Router } from "@angular/router";
import { IGrade, IGradeResponse } from "../../../../shared/interfaces";
import { DUPLICATE_INSERT } from "../../../../shared/constants";

@Component({
  selector: "app-grade-new",
  templateUrl: "./grade-new.component.html",
  styleUrls: ["./grade-new.component.scss"]
})
export class GradeNewComponent implements OnInit {
  title: string;
  gradeFormGroup: FormGroup;
  showSummaryErrors: boolean;
  summaryErrors: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private gradeDataService: GradeService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Grade";
    });
  }

  private buildFormGroup() {
    this.gradeFormGroup = this.formBuilder.group({
      gradeCode: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      gradeName: ["", [Validators.maxLength(45)]]
    });
  }

  gotoGradeList() {
    this.router.navigateByUrl("gradelist");
  }

  submit() {
    let grade: IGrade;
    grade = this.gradeFormGroup.value;

    this.gradeDataService.insertGradeMaster(grade).subscribe(
      (response: IGradeResponse) => {
        if (response.error) {
          this.showSummaryErrors = true;
          if (
            response.error["originalError"] &&
            response.error["originalError"]["info"]
          ) {
            let isDuplicateEntry = response.error["originalError"]["info"][
              "message"
            ]
              .toString()
              .indexOf(DUPLICATE_INSERT);
            if (isDuplicateEntry != -1) {
              this.summaryErrors =
                "Grade code '" +
                grade.gradeCode +
                "' already exist. Try other grade code.";
            }
          }
        } else {
          this.showSummaryErrors = false;
          this.router.navigate(["gradelist"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
