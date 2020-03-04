import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";

import { MatSort } from "@angular/material/sort";

import { ICompany } from "../../../../shared/interfaces";
import { ViewChild } from "@angular/core";
import { DataService } from "../../../../core/data.service";
import { Router } from "@angular/router";
import { PromptComponent } from "../../../../shared/dialogs/prompt/prompt.component";

@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.scss"]
})
export class CompanyListComponent implements OnInit {
  title: string;
  dataSource: MatTableDataSource<ICompany>;
  companies: ICompany[];
  displayedColumns: string[] = [
    "code",
    "name",
    "address",
    "shortName",
    "panNumber",
    "tanNumber",
    "pfNumber",
    "lcNumber",
    "displayLink"
  ];
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.title = "Company Details";
    this.getCompanies();
  }

  getCompanies() {
    this.dataService.getCompanies().subscribe((companies: ICompany[]) => {
      this.companies = companies;
      this.dataSource = new MatTableDataSource<ICompany>(this.companies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createCompany() {
    this.router.navigateByUrl("company");
  }

  editCompanyMaster(company) {
    this.router.navigate(["companyedit", company.COMPANYCODE]);
  }

  openPrompt(company: ICompany) {
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
        this.deleteCompany(company["COMPANYCODE"]);
      }
    });
  }

  deleteCompany(companyCode: string) {
    this.dataService
      .deleteCompany(companyCode)
      .subscribe((isDeleted: boolean) => {
        this.ngOnInit();
      });
  }
}
