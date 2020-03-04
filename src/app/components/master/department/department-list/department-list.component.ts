import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { IDepartment } from "../../../../shared/interfaces";
import { DataService } from "../../../../core/data.service";
import { Router } from "@angular/router";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";
import { DepartmentService } from "../../../../core/services/department.service";

@Component({
  selector: "app-department-list",
  templateUrl: "./department-list.component.html",
  styleUrls: ["./department-list.component.scss"]
})
export class DepartmentListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<IDepartment>;
  departments: IDepartment[];
  displayedColumns: string[] = ["code", "name", "head", "email", "displayLink"];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private departmentDataService: DepartmentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Department Details";
    this.getDepartments();
  }

  getDepartments() {
    this.departmentDataService
      .getDepartments()
      .subscribe((departments: IDepartment[]) => {
        this.departments = departments;
        this.dataSource = new MatTableDataSource<IDepartment>(this.departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  createDepartment() {
    this.router.navigateByUrl("department");
  }

  editDepartmentMaster(department) {
    this.router.navigate(["departmentedit", department.DEPARTMENTCODE]);
  }

  openPrompt(department: IDepartment) {
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
        this.deleteDepartment(department["DEPARTMENTCODE"]);
      }
    });
  }

  deleteDepartment(deparmentCode: string) {
    this.departmentDataService
      .deleteDeparment(deparmentCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
