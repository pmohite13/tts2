import { Component, OnInit, NgZone, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ShiftService } from "../../../../core/services/shift.service";
import { Router } from "@angular/router";
import { IShift, IShiftResponse } from "../../../../shared/interfaces";
import { DUPLICATE_INSERT, MASK_TIME_FORMAT, SHIFT_POSITIONS, ZERO_TIME_VALUE, TIME_FORMAT_SEPERATOR, GET_12_HOURS, DECIMAL_FORMAT_SEPERATOR, GET_MIN_MINUTES_UNIT } from "../../../../shared/constants";
import { ValidationService } from "../../../../shared/validation.service";
import { CommonService } from "../../../../shared/common.service";

@Component({
  selector: "app-shift-new",
  templateUrl: "./shift-new.component.html",
  styleUrls: ["./shift-new.component.scss"],
})
export class ShiftNewComponent implements OnInit {
  title: string;
  shiftFormGroup: FormGroup;
  showSummaryErrors: boolean;
  summaryErrors: string;
  shiftPositions: string[];
  public maskTime = MASK_TIME_FORMAT;

  @Output() valueChange = new EventEmitter();
  currentShiftHours: string;
  titleSuffix: string;
  currFormValue: any = null;
  currStartTime: string;
  currEndTime: string;
  currLunchTime: string;
  currLunchDuration: string;
  currLunchEndTime: string;
  currOtStartAfter: string;
  currOtDeductHrs: string;
  currShiftPosition: string;
  currLunchDeduction: string;
  currShiftDuration: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private shiftDataService: ShiftService,
    private commonService : CommonService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Shift";
      this.titleSuffix = '(24-hours time format)';
      this.shiftPositions = SHIFT_POSITIONS;
    });
  }

  private buildFormGroup() {
    this.shiftFormGroup = this.formBuilder.group({
      shift: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      startTime: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      endTime: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      lunchTime: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      lunchDuration: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      lunchEndTime: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      otStartAfter: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      otDeductHrs: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      lunchDeduction: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      shiftPosition: [""],
      shiftDuration: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
      otDeductAfter: [ZERO_TIME_VALUE, [ValidationService.time24HourValidator]],
    });
  }

  gotoShiftList() {
    this.router.navigateByUrl("shiftlist");
  }

  extractAndSetFormValues() {

    this.currFormValue = this.shiftFormGroup.value;
    this.currStartTime = this.currFormValue.startTime;
    this.currEndTime = this.currFormValue.endTime;
    this.currLunchTime = this.currFormValue.lunchTime;
    this.currLunchDuration = this.currFormValue.lunchDuration;
    this.currLunchEndTime = this.currFormValue.lunchEndTime;
    this.currOtStartAfter = this.currFormValue.otStartAfter;
    this.currOtDeductHrs = this.currFormValue.otDeductHrs;
    this.currLunchDeduction = this.currFormValue.lunchDeduction;
    this.currShiftDuration = this.currFormValue.shiftDuration;
    this.currOtDeductHrs = this.currFormValue.otDeductAfter;

  }

  getPrefixZeroTimeformat(inputTime: string, seprator: string): string {
    if (inputTime !== ZERO_TIME_VALUE) {
      let hours = this.getHours(inputTime, seprator);
      let minutes = this.getMinutes(inputTime, seprator);

      return hours.padStart(2, '0').concat(seprator).concat(minutes.padStart(2, '0'));
    }
    return ZERO_TIME_VALUE;
  }

  getHours(inputTime: string, seprator: string): string {
    return inputTime.substr(0, inputTime.indexOf(seprator));
  }

  getMinutes(inputTime: string, seprator: string): string {
    return inputTime.substr(inputTime.indexOf(seprator) + 1, inputTime.length);
  }

  calculateShiftHours() {

    this.extractAndSetFormValues();

    let startTime = this.getPrefixZeroTimeformat(this.currStartTime, TIME_FORMAT_SEPERATOR);
    let startTimeHours = Number(this.getHours(startTime, TIME_FORMAT_SEPERATOR));
    let startTimeMinutes = Number(this.getMinutes(startTime, TIME_FORMAT_SEPERATOR));

    let endTime = this.getPrefixZeroTimeformat(this.currEndTime, TIME_FORMAT_SEPERATOR);
    let endTimeHours = Number(this.getHours(endTime, TIME_FORMAT_SEPERATOR));
    let endTimeMinutes = Number(this.getMinutes(endTime, TIME_FORMAT_SEPERATOR));

    let shiftHours: number;

    if (endTimeHours < startTimeHours) {
      shiftHours = this.add24HoursShiftTime(startTimeHours, endTimeHours);
    }
    else {
      shiftHours = endTimeHours - startTimeHours;
    }
    
    shiftHours += this.getHoursFromMinutes(endTimeMinutes - startTimeMinutes);
    this.currentShiftHours = this.getPrefixZeroTimeformat(shiftHours.toFixed(2).toString().replace(DECIMAL_FORMAT_SEPERATOR, TIME_FORMAT_SEPERATOR), TIME_FORMAT_SEPERATOR);
  
    this.updateShiftDuration(this.currentShiftHours);

  }

  private getHoursFromMinutes(totalMinutes: number) {
    return totalMinutes > 60 ? totalMinutes / 60 : totalMinutes / 100;
  }

  private add24HoursShiftTime(startTimeHours: number, endTimeHours: number) {
    return GET_12_HOURS + GET_12_HOURS - startTimeHours + endTimeHours;
  }

  private updateShiftDuration(shiftDuration: string) {
    this.shiftFormGroup.patchValue({
      shiftDuration: shiftDuration
    });
  }

  lunchStartTimeChanged() {

    this.extractAndSetFormValues();

    let startTime = Number(this.getDecimalFormat(this.getPrefixZeroTimeformat(this.currStartTime, TIME_FORMAT_SEPERATOR)));
    let lunchStartTime = Number(this.getDecimalFormat(this.getPrefixZeroTimeformat(this.currLunchTime, TIME_FORMAT_SEPERATOR)));
    this.updateLunchEndTime(this.getPrefixZeroTimeformat(this.currLunchTime, TIME_FORMAT_SEPERATOR));

    let endTime = startTime + Number(this.getDecimalFormat(this.currentShiftHours));

    if (!(lunchStartTime > startTime && lunchStartTime < endTime)) { this.clearLunchTimings(); }
  }

  private getDecimalFormat(input): string {
    return input.replace(':', '.');
  }

  private updateLunchEndTime(time: any) {
    this.shiftFormGroup.patchValue({
      lunchEndTime: time
    });
  }

  private clearLunchTimings() {
    this.shiftFormGroup.patchValue({
      lunchTime: ZERO_TIME_VALUE,
      lunchDuration: ZERO_TIME_VALUE,
      lunchEndTime: ZERO_TIME_VALUE
    });
  }

  private isTimeEntered = (lunchTime) => lunchTime > 0;

  lunchHoursChanged() {
   
    this.extractAndSetFormValues();

    let lunchStartTime = Number(this.getDecimalFormat(this.getPrefixZeroTimeformat(this.currLunchTime, TIME_FORMAT_SEPERATOR)));
    let lunchDuration = this.getDecimalFormat(this.getPrefixZeroTimeformat(this.currLunchDuration, TIME_FORMAT_SEPERATOR));
    let lunchEndTime = this.getDecimalFormat(this.getPrefixZeroTimeformat(this.currLunchTime, TIME_FORMAT_SEPERATOR));//setting lunch endtime same as lunch startdate

    if (this.isTimeEntered(lunchStartTime)) {

      let lunchDurationHours = Number(this.getHours(lunchDuration, DECIMAL_FORMAT_SEPERATOR));
      let lunchDurationMinutes = Number(this.getMinutes(lunchDuration, DECIMAL_FORMAT_SEPERATOR));

      let workingShiftTotalHours = this.currentShiftHours;
      this.calculateAndSetWorkingShiftTotalHours(workingShiftTotalHours, lunchDurationHours, lunchDurationMinutes);

      if (this.isTimeEntered(lunchEndTime)) {
        let lunchEndHours = Number(this.getHours(lunchEndTime, DECIMAL_FORMAT_SEPERATOR));
        let lunchEndMinutes = Number(this.getMinutes(lunchEndTime, DECIMAL_FORMAT_SEPERATOR));

        lunchEndHours += lunchDurationHours;
        lunchEndMinutes += lunchDurationMinutes;     

        let totalMinutesInHour = this.getHoursFromMinutes(lunchEndMinutes);
        lunchEndTime = this.formatTime(totalMinutesInHour, lunchEndTime, lunchEndHours);

        this.updateLunchEndTime(this.getPrefixZeroTimeformat(lunchEndTime.replace('.', ':'), TIME_FORMAT_SEPERATOR));

      }

    }
    else {
      this.clearLunchTimings();
    }

  }


  private formatTime(totalMinutesInHour: number, lunchEndTime: string, lunchEndHours: number) {
    if (totalMinutesInHour > GET_MIN_MINUTES_UNIT) {
      lunchEndTime = (lunchEndHours + totalMinutesInHour).toString();
    }
    else {
      let suffix = totalMinutesInHour.toFixed(2);
      lunchEndTime = Number(lunchEndHours + suffix.substr(suffix.indexOf('.'), suffix.length - suffix.indexOf('.'))).toFixed(2);
    }
    return lunchEndTime;
  }

  private calculateAndSetWorkingShiftTotalHours(workingShiftTotalHours: string, lunchDurationHours: number, lunchDurationMinutes: number) {
    if (workingShiftTotalHours !== ZERO_TIME_VALUE) {
      let workingShiftHours = Number(this.getHours(workingShiftTotalHours, TIME_FORMAT_SEPERATOR));
      let workingShiftMinutes = Number(this.getMinutes(workingShiftTotalHours, TIME_FORMAT_SEPERATOR));
      let workingShiftHoursMinusLunchHours = (workingShiftHours - lunchDurationHours);
      let workingShiftMinutesMinusLunchMinutes = Math.abs((workingShiftMinutes - lunchDurationMinutes));

      let total = ZERO_TIME_VALUE;
      total = this.formatTime(this.getHoursFromMinutes(workingShiftMinutesMinusLunchMinutes), total, workingShiftHoursMinusLunchHours);

      this.updateShiftDuration(this.getPrefixZeroTimeformat(total.toString().replace('.', ':'), TIME_FORMAT_SEPERATOR));
    }
  }
 

  getDateTimeFromTime(time: string) {

    let currDate = new Date();
    let currYear = currDate.getFullYear();
    let currMonth = currDate.getMonth();
    let currDay = currDate.getDay();

    let startTimeHH = Number(time.substr(0, time.indexOf(':')));
    let startTimeMM = Number(time.substr(time.indexOf(':') + 1, time.length));

    return new Date(Date.UTC(currYear, currMonth, currDay, startTimeHH, startTimeMM));
  }

  submit() {
    debugger;
    let shift: IShift;
    shift = this.shiftFormGroup.value;

    shift.startTime = this.getDateTimeFromTime(shift.startTime.toString());
    shift.endTime = this.getDateTimeFromTime(shift.endTime.toString());
    shift.lunchTime = this.getDateTimeFromTime(shift.lunchTime.toString());
    shift.lunchEndTime = this.getDateTimeFromTime(shift.lunchEndTime.toString());
    shift.lunchDuration = this.commonService.calculateMinutes(shift.lunchDuration.toString());
    shift.otStartAfter = this.commonService.calculateMinutes(shift.otStartAfter.toString());
    shift.otDeductHrs = this.commonService.calculateMinutes(shift.otDeductHrs.toString());
    shift.lunchDeduction = this.commonService.calculateMinutes(shift.lunchDeduction.toString());
    shift.shiftDuration = this.commonService.calculateMinutes(shift.shiftDuration.toString());
    shift.otDeductAfter = this.commonService.calculateMinutes(shift.otDeductAfter.toString());


    this.shiftDataService.insertShiftMaster(shift).subscribe(
      (response: IShiftResponse) => {
        debugger;
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
                "shift code '" +
                shift.shift +
                "' already exist. Try other shift code.";
            }
          }
        } else {
          this.showSummaryErrors = false;
          this.router.navigate(["shiftlist"]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

 

}
