import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "../../../../shared/common.service";

@Component({
  selector: "app-employee-new",
  templateUrl: "./employee-new.component.html",
  styleUrls: ["./employee-new.component.scss"],
})
export class EmployeeNewComponent implements OnInit {
  title: string;
  employeeFormGroup: any;
  companies: string[] = [];
  departments: string[] = [];
  sections: string[] = [];
  grades: string[] = [];
  categories: string[] = [];
  bloodGroups: string[] = [];
  lateArrivalsAfterMaxLimit: string[] = [];
  earlyDepaturesAfterMaxLimit: string[] = [];
  shiftTypes: string[] = [];
  shifts: string[] = [];
  weekDays: string[] = [];
  woTypes: string[] = [];
  minDate: Date;
  maxDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private commonService: CommonService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    let currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1); //01st January of current year
    this.maxDate = new Date(currentYear, 11, 31); //31st December of current year

    this.ngZone.run(() => {
      this.title = "Add New Employee";
    });
  }

  private buildFormGroup() {
    this.employeeFormGroup = this.formBuilder.group({
      // shift: [
      //   "",
      //   [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      // ],

      /* Official Detail */
      active: [""],
      cardNo: ["", [Validators.required, Validators.maxLength(8)]],
      empName: ["", [Validators.required, Validators.maxLength(25)]],
      guardianName: ["", [Validators.maxLength(30)]],
      companyCode: [""],
      departmentCode: [""],
      cat: [""],
      divisionCode: [""],
      gradeCode: [""],
      pfNo: ["", [Validators.maxLength(15)]],
      esiNo: [""],

      /* Personal Detail */
      dateOfBirth: ["", [Validators.required]],
      dateOfJoin: ["", [Validators.required]],
      dateOfRetirement: [""],
      isMarried: [""],
      bloodGroup: [""],
      qualification: ["", [Validators.maxLength(20)]],
      experience: ["", [Validators.maxLength(20)]],
      designation: ["", [Validators.maxLength(25)]],
      sex: [""],
      bankAcc: ["", [Validators.maxLength(20)]],
      email: ["", [Validators.maxLength(30)]],
      bus: ["", [Validators.maxLength(10)]],
      vehicleNo: ["", [Validators.maxLength(15)]],
      address1: ["", [Validators.maxLength(50)]],
      pincode1: ["", [Validators.maxLength(8)]],
      telephone1: ["", [Validators.maxLength(10)]],
      E_MAIL1: [""],
      address2: ["", [Validators.maxLength(50)]],
      pincode2: ["", [Validators.maxLength(8)]],
      telephone2: ["", [Validators.maxLength(10)]],

      /* Time office policy */
      permisLateArrival: [""],
      permisEarlyDeprt: [""],
      maxDayMin: [""], //maximum working hours in a day
      //night shift applicable (RTC)
      isTimeLossAllowed: [""], // consider time loss
      isOutWork: [""], //outwork deduct
      isHalfDay: [""], //half day marking
      isShort: [""], // shortlive marking
      //present marking duration
      short: [""], //maximum working hours for half day : Avinash Rao
      half: [""], //maxmimum absent hours for short day : Avinash Rao
      lateArrvMark: [""],
      noLateArrv: [""],
      lateArriv: [""],
      isPunchAll: [""], //punches required in a day
      isOT: [""], //overtime applicable
      otRate: [""], //overtime rate per hour
      isOS: [""], //overstay applicable
      earlyDeptMark: [""], // early departure marking
      noEarlyDept: [""], //No. of times early departure is allowed
      earlyDept: [""], //

      /*Shift/WO Policy */
      shiftType: [""],
      shift: [""],
      shiftPattern: [""],
      isAutoShift: [""],
      authShifts: [""],
      shiftRemainDays: [""],
      cDays: [""], // shift change after how many days
      firstOffDay: [""],
      secondOffDay: [""],
      secondOffType: [""],
      halfDayShift: [""],
      alternateOffDays: [""],
      secondShift: [""], //shift dropdown in allow second shift section
      secondShiftDay: [""],
      alternateShiftDays: [""],
      allwSecondShift: [""], // in database its column name is AllwSecondShit (dull)
    });
  }
}
