import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IGrade, IGradeResponse } from "../../../../shared/interfaces";
import { Router, ActivatedRoute } from "@angular/router";
import { GradeService } from "../../../../core/services/gradeservice";

@Component({
  selector: "app-grade-edit",
  templateUrl: "./grade-edit.component.html",
  styleUrls: ["./grade-edit.component.scss"]
})
export class GradeEditComponent implements OnInit {
  title: string;
  gradeFormGroup: FormGroup;
  grade: IGrade;
  gradeCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private gradeDataService: GradeService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.gradeCode = this.route.snapshot.params["gradeCode"];
    this.getGradeByCode();
    this.ngZone.run(() => {
      this.title = "Edit Grade";
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

  private patchGrade(division: IGrade) {
    if (division) {
      this.gradeFormGroup.patchValue({
        gradeCode: division["GradeCode"],
        gradeName: division["GradeName"]
      });
    }
  }

  getGradeByCode() {
    this.gradeDataService
      .getGradeByCode(this.gradeCode)
      .subscribe((grade: IGrade) => {
        this.grade = grade;
        this.patchGrade(this.grade);
      });
  }

  gotoGradeList() {
    this.router.navigateByUrl("gradelist");
  }

  submit() {
    let division: IGrade;
    division = this.gradeFormGroup.value;

    this.gradeDataService.updateGradeMaster(division).subscribe(
      (grade: IGradeResponse) => {
        this.router.navigate(["gradelist"]);
      },
      err => console.log(err)
    );
  }
}
