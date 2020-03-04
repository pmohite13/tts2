import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { IDivision } from "../../../../shared/interfaces";
import { SectionService } from "../../../../core/services/sectionservice";
import { Router } from "@angular/router";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-section-list",
  templateUrl: "./section-list.component.html",
  styleUrls: ["./section-list.component.scss"]
})
export class SectionListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<IDivision>;
  departments: IDivision[];
  displayedColumns: string[] = ["code", "name", "displayLink"];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private divisionDataService: SectionService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Section Details";
    this.getDivisions();
  }

  getDivisions() {
    this.divisionDataService
      .getDivisions()
      .subscribe((departments: IDivision[]) => {
        this.departments = departments;
        this.dataSource = new MatTableDataSource<IDivision>(this.departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  createDivision() {
    this.router.navigateByUrl("section");
  }

  editDivisionMaster(division) {
    this.router.navigate(["sectionedit", division.DivisionCode]);
  }

  openPrompt(division: IDivision) {
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
        this.deleteDivision(division["DivisionCode"]);
      }
    });
  }

  deleteDivision(divisionCode: string) {
    this.divisionDataService
      .deleteDivision(divisionCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
