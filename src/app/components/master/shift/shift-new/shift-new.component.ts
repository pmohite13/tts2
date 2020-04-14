import { Component, OnInit, NgZone, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ShiftService } from "../../../../core/services/shift.service";
import { Router } from "@angular/router";
import { IShift, IShiftResponse } from "../../../../shared/interfaces";
import { DUPLICATE_INSERT } from "../../../../shared/constants";

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
  public maskTime = [/[0-2]/, /\d/, ":", /[0-5]/, /\d/];

  @Output() valueChange = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private shiftDataService: ShiftService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Shift";
      this.shiftPositions = ["DAY", "NIGHT"];
    });
  }

  private buildFormGroup() {
    this.shiftFormGroup = this.formBuilder.group({
      shift: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      startTime: [""],
      endTime: [""],
      lunchTime: [""],
      lunchDuration: [""],
      lunchEndTime: [""],
      otStartAfter: [""],
      otDeductHrs: [""],
      lunchDeduction: [""],
      shiftPosition: [""],
      shiftDuration: [""],
      otDeductAfter: [""],
    });
  }

  gotoShiftList() {
    this.router.navigateByUrl("shiftlist");
  }

  calculateShiftHours() {
    debugger;
    this.shiftFormGroup;
  }

  submit() {
    debugger;
    let shift: IShift;
    shift = this.shiftFormGroup.value;

    this.shiftDataService.insertShiftMaster(shift).subscribe(
      (response: IShiftResponse) => {
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

  startTimeChanged(value) {
    debugger;
  }
}
