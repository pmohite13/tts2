import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IDepartment } from "../../../../shared/interfaces";
import { Router, ActivatedRoute } from "@angular/router";
import { DepartmentService } from "../../../../core/services/department.service";
import { ValidationService } from "../../../../shared/validation.service";

@Component({
  selector: "app-department-edit",
  templateUrl: "./department-edit.component.html",
  styleUrls: ["./department-edit.component.scss"]
})
export class DepartmentEditComponent implements OnInit {
  title: string;
  departmentFormGroup: FormGroup;
  department: IDepartment;
  departmentCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private departmentDataService: DepartmentService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.departmentCode = this.route.snapshot.params["departmentCode"];
    this.getDepartmentByCode();
    this.ngZone.run(() => {
      this.title = "Edit Department";
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

  private patchDepartment(department: IDepartment) {
    if (department) {
      this.departmentFormGroup.patchValue({
        departmentCode: department["DEPARTMENTCODE"],
        departmentName: department["DEPARTMENTNAME"],
        departmentHead: department["DEPARTMENTHEAD"],
        emailId: department["EMAIL_ID"]
      });
    }
  }

  getDepartmentByCode() {
    this.departmentDataService
      .getDepartmentByCode(this.departmentCode)
      .subscribe((department: IDepartment) => {
        this.department = department;
        this.patchDepartment(this.department);
      });
  }

  gotoDepartmentList() {
    this.router.navigateByUrl("departmentlist");
  }

  submit() {
    let department: IDepartment;
    department = this.departmentFormGroup.value;

    this.departmentDataService.updateDepartmentMaster(department).subscribe(
      (department: IDepartment) => {
        this.router.navigate(["departmentlist"]);
      },
      err => console.log(err)
    );
  }
}
