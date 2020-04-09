import { Component, OnInit, ViewChild } from "@angular/core";
import { IShift } from "../../../../shared/interfaces";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { ShiftService } from "../../../../core/services/shift.service";
import { Router } from "@angular/router";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-shift-list",
  templateUrl: "./shift-list.component.html",
  styleUrls: ["./shift-list.component.scss"]
})
export class ShiftListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<IShift>;
  shifts: IShift[];
  displayedColumns: string[] = [
    "code",
    "startTime",
    "endTime",
    "lunchTime",
    "lunchDuration",
    "lunchEndTime",
    "otStartAfter",
    "otDeductHrs",
    "lunchDeduction",
    "shiftPosition",
    "shiftDuration",
    "otDeductAfter",
    "displayLink"
  ];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private shiftDataService: ShiftService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Shift Details";
    this.getShifts();
  }

  getShifts() {
    this.shiftDataService.getShifts().subscribe((shifts: IShift[]) => {
      this.shifts = shifts;
      this.dataSource = new MatTableDataSource<IShift>(this.shifts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createShift() {
    this.router.navigateByUrl("shift");
  }

  editShiftMaster(shift) {
    this.router.navigate(["shiftedit", shift.SHIFT]);
  }

  openPrompt(department: IShift) {
    let yesButton = "Yes";
    let noButton = "No";

    const dialogRef = this.dialog.open(PromptComponent, {
      width: "300px",
      data: {
        title: "Are you sure to delete?",
        yesButton: yesButton,
        noButton: noButton
      }
    });
    dialogRef.componentInstance.dialogRef.afterClosed().subscribe(result => {
      if (result["event"] === yesButton) {
        console.log("Delete");
        this.deleteShift(department["SHIFT"]);
      }
    });
  }

  deleteShift(shiftCode: string) {
    this.shiftDataService
      .deleteShift(shiftCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
