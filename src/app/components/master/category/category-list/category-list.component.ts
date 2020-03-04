import { Component, OnInit, ViewChild } from "@angular/core";
import { ICategory } from "../../../../shared/interfaces";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { Router } from "@angular/router";
import { CategoryService } from "../../../../core/services/categoryservice";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"]
})
export class CategoryListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<ICategory>;
  categories: ICategory[];
  displayedColumns: string[] = ["code", "name", "displayLink"];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoryDataService: CategoryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Category Details";
    this.getCategories();
  }

  getCategories() {
    this.categoryDataService
      .getCategories()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
        this.dataSource = new MatTableDataSource<ICategory>(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  createCategory() {
    this.router.navigateByUrl("category");
  }

  editCategoryMaster(category) {
    this.router.navigate(["categoryedit", category.CAT]);
  }

  openPrompt(category: ICategory) {
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
        this.deleteCategory(category["CAT"]);
      }
    });
  }

  deleteCategory(divisionCode: string) {
    this.categoryDataService
      .deleteCategory(divisionCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
