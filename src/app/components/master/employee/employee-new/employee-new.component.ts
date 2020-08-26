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
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private commonService: CommonService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
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
      cardNo: [""],
      empName: [""],
      guardianName: [""],
      companyCode: [""],
      departmentCode: [""],
      cat: [""],
      divisionCode: [""],
      gradeCode: [""],
      pfNo: [""],
      esiNo: [""],

      /* Personal Detail */
      dateOfBirth: [""],
      dateOfJoin: [""],
      dateOfRetirement: [""],
      isMarried: [""],
      bloodGroup: [""],
      qualification: [""],
      experience: [""],
      designation: [""],
      sex: [""],
      bankAcc: [""],
      email: [""],
      bus: [""],
      vehicleNo: [""],
      address1: [""],
      pincode1: [""],
      telephone1: [""],
      E_MAIL1: [""],
      address2: [""],
      pincode2: [""],
      telephone2: [""],

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
