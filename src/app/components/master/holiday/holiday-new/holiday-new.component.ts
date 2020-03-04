import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  IHoliday,
  IHolidayResponse,
  ICompany,
  IDepartment
} from "../../../../shared/interfaces";
import { HolidayService } from "../../../../core/services/holiday.service";
import { Router } from "@angular/router";
import { DUPLICATE_INSERT } from "../../../../shared/constants";
import { DataService } from "../../../../core/data.service";
import { DepartmentService } from "../../../../core/services/department.service";

@Component({
  selector: "app-holiday-new",
  templateUrl: "./holiday-new.component.html",
  styleUrls: ["./holiday-new.component.scss"]
})
export class HolidayNewComponent implements OnInit {
  title: string;
  holidayFormGroup: FormGroup;
  showSummaryErrors: boolean;
  summaryErrors: string;
  minDate: Date;
  maxDate: Date;
  companies: ICompany[];
  departments: IDepartment[];

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private holidayDataService: HolidayService,
    private dataService: DataService,
    private departmentDataService: DepartmentService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    let currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1); //01st January of current year
    this.maxDate = new Date(currentYear, 11, 31); //31st December of current year

    this.ngZone.run(() => {
      this.title = "Add New Holiday";
      this.getCompanies();
    });
  }

  getCompanies() {
    this.dataService.getCompanies().subscribe((companies: ICompany[]) => {
      this.companies = companies;
      this.getDepartments();
    });
  }

  getDepartments() {
    this.departmentDataService
      .getDepartments()
      .subscribe((departments: IDepartment[]) => {
        this.departments = departments;
      });
  }

  private buildFormGroup() {
    this.holidayFormGroup = this.formBuilder.group({
      hDate: ["", [Validators.required]],
      holiday: ["", [Validators.required, Validators.maxLength(20)]],
      companyCode: ["", [Validators.required]],
      departmentCode: ["", [Validators.required]],
      adjustmentHoliday: [""],
      otFactor: ["0"]
    });
  }

  gotoHolidayList() {
    this.router.navigateByUrl("holidaylist");
  }

  submit() {
    let holiday: IHoliday;
    holiday = this.holidayFormGroup.value;

    holiday.hDate = new Date(holiday.hDate.toString());
    holiday.adjustmentHoliday = new Date(holiday.adjustmentHoliday.toString());

    this.holidayDataService.insertHolidayMaster(holiday).subscribe(
      (response: IHolidayResponse) => {
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
                "Holiday on '" +
                holiday.hDate +
                "' for company code: '" +
                holiday.companyCode +
                "' and department: '" +
                holiday.departmentCode +
                "' already exist.";
            }
          }
        } else {
          this.showSummaryErrors = false;
          this.router.navigate(["holidaylist"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
