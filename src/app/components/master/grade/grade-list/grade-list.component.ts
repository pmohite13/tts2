import { Component, OnInit, ViewChild } from "@angular/core";
import { IGrade } from "../../../../shared/interfaces";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { GradeService } from "../../../../core/services/gradeservice";
import { Router } from "@angular/router";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-grade-list",
  templateUrl: "./grade-list.component.html",
  styleUrls: ["./grade-list.component.scss"]
})
export class GradeListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<IGrade>;
  grades: IGrade[];
  displayedColumns: string[] = ["code", "name", "displayLink"];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private gradeDataService: GradeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Grade Details";
    this.getGrades();
  }

  getGrades() {
    this.gradeDataService.getGrades().subscribe((grades: IGrade[]) => {
      this.grades = grades;
      this.dataSource = new MatTableDataSource<IGrade>(this.grades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createGrade() {
    this.router.navigateByUrl("grade");
  }

  editGradeMaster(grade) {
    this.router.navigate(["gradeedit", grade.GradeCode]);
  }

  openPrompt(grade: IGrade) {
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
        this.deleteGrade(grade["GradeCode"]);
      }
    });
  }

  deleteGrade(divisionCode: string) {
    this.gradeDataService
      .deleteGrade(divisionCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
