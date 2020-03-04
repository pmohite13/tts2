import { Component, OnInit, ViewChild } from "@angular/core";
import { IHoliday } from "../../../../shared/interfaces";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { Router } from "@angular/router";
import { HolidayService } from "../../../../core/services/holiday.service";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-holiday-list",
  templateUrl: "./holiday-list.component.html",
  styleUrls: ["./holiday-list.component.scss"]
})
export class HolidayListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<IHoliday>;
  holidays: IHoliday[];
  displayedColumns: string[] = [
    "hdate",
    "holiday",
    "companycode",
    "departmentcode",
    "adjustmentDate",
    "displayLink"
  ];
  pageSize: number = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private holidayDataService: HolidayService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Holidays Details";
    this.getHolidays();
  }

  getHolidays() {
    this.holidayDataService.getHolidays().subscribe((holidays: IHoliday[]) => {
      this.holidays = holidays;
      this.dataSource = new MatTableDataSource<IHoliday>(this.holidays);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createHoliday() {
    this.router.navigateByUrl("holiday");
  }

  openPrompt(holiday: IHoliday) {
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
        this.deleteDepartment(holiday);
      }
    });
  }

  deleteDepartment(holiday: IHoliday) {
    debugger;
    this.holidayDataService
      .deleteHoliday(
        holiday["HDate"],
        holiday["COMPANYCODE"],
        holiday["DEPARTMENTCODE"]
      )
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
