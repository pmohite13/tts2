import { Component, OnInit, NgZone } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ICompany } from "../../../../shared/interfaces";
import { DataService } from "../../../../core/data.service";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"]
})
export class CompanyComponent implements OnInit {
  title: string;
  companyFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private dataService: DataService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Company";
    });
  }

  private buildFormGroup() {
    this.companyFormGroup = this.formBuilder.group({
      companyCode: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      companyName: ["", [Validators.required, Validators.maxLength(50)]],
      companyAddress: ["", [Validators.required, Validators.maxLength(150)]],
      shortName: ["", [Validators.required, Validators.maxLength(10)]],
      pannum: ["", [Validators.required, Validators.maxLength(25)]],
      tanNumber: ["", [Validators.required, Validators.maxLength(25)]],
      pfno: ["", Validators.maxLength(12)],
      lcno: ["", Validators.maxLength(25)]
    });
  }

  gotoCompanyList() {
    this.router.navigateByUrl("companylist");
  }

  submit() {
    let company: ICompany;
    company = this.companyFormGroup.value;

    this.dataService.insertCompanyMaster(company).subscribe(
      (company: ICompany) => {
        this.router.navigate(["companylist"]);
      },
      err => console.log(err)
    );
  }
}
