import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeService } from "../../../../core/services/employee.service";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { IEmployeeShift, IEmployee } from "../../../../shared/interfaces";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit {
  title: string;
  employees: IEmployee[];
  dataSource: MatTableDataSource<IEmployee>;
  displayedColumns: string[] = [
    "active",
    "payCode",
    "presentCardNo",
    "empName",
    "dateOfBirth",
    "dateOfJoin",
    "displayLink",
  ];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    debugger;
    this.title = "Employee Details";
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees: IEmployee[]) => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource<IEmployee>(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createEmployee() {
    this.router.navigateByUrl("employee");
  }

  editEmployee(shift) {
    this.router.navigate(["employeeedit", shift.SHIFT]);
  }

  openPrompt(shift: IEmployeeShift) {
    let yesButton = "Yes";
    let noButton = "No";

    const dialogRef = this.dialog.open(PromptComponent, {
      width: "300px",
      data: {
        title: "Are you sure to delete?",
        yesButton: yesButton,
        noButton: noButton,
      },
    });
    dialogRef.componentInstance.dialogRef.afterClosed().subscribe((result) => {
      if (result["event"] === yesButton) {
        console.log("Delete");
        this.deleteShift(shift["PAYCODE"]);
      }
    });
  }

  deleteShift(payCode: string) {
    this.employeeService
      .deleteEmployee(payCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
