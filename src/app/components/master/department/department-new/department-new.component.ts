import { Component, OnInit, NgZone } from "@angular/core";
import { DepartmentService } from "../../../../core/services/department.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import {
  IDepartment,
  IDepartmentResponse
} from "../../../../shared/interfaces";
import { ValidationService } from "../../../../shared/validation.service";
import { debug } from "util";
import { DUPLICATE_INSERT } from "../../../../shared/constants";

@Component({
  selector: "app-department-new",
  templateUrl: "./department-new.component.html",
  styleUrls: ["./department-new.component.scss"]
})
export class DepartmentNewComponent implements OnInit {
  title: string;
  departmentFormGroup: FormGroup;
  showSummaryErrors: boolean;
  summaryErrors: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private departmentDataService: DepartmentService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Department";
    });
  }

  private buildFormGroup() {
    this.departmentFormGroup = this.formBuilder.group({
      departmentCode: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      departmentName: ["", [Validators.maxLength(45)]],
      departmentHead: ["", [Validators.maxLength(35)]],
      emailId: [
        "",
        [Validators.maxLength(35), ValidationService.emailValidator]
      ]
    });
  }

  gotoDepartmentList() {
    this.router.navigateByUrl("departmentlist");
  }

  submit() {
    let department: IDepartment;
    department = this.departmentFormGroup.value;

    this.departmentDataService.insertDepartmentMaster(department).subscribe(
      (response: IDepartmentResponse) => {
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
                "Department code '" +
                department.departmentCode +
                "' already exist. Try other department code.";
            }
          }
        } else {
          this.showSummaryErrors = false;
          this.router.navigate(["departmentlist"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
