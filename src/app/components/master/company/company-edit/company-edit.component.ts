import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../../../core/data.service";
import { ICompany } from "../../../../shared/interfaces";

@Component({
  selector: "app-company-edit",
  templateUrl: "./company-edit.component.html",
  styleUrls: ["./company-edit.component.scss"]
})
export class CompanyEditComponent implements OnInit {
  title: string;
  companyFormGroup: FormGroup;
  company: ICompany;
  companyCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.companyCode = this.route.snapshot.params["companyCode"];
    this.getCompanyByCode();
    this.ngZone.run(() => {
      this.title = "Edit Company";
    });
  }

  getCompanyByCode() {
    this.dataService
      .getCompanyByCode(this.companyCode)
      .subscribe((company: ICompany) => {
        this.company = company;
        this.patchCompany(this.company);
      });
  }

  private patchCompany(company: ICompany) {
    if (company) {
      this.companyFormGroup.patchValue({
        companyCode: company["COMPANYCODE"],
        companyName: company["COMPANYNAME"],
        companyAddress: company["COMPANYADDRESS"],
        shortName: company["SHORTNAME"],
        pannum: company["PANNUM"],
        tanNumber: company["TANNUMBER"],
        pfno: company["PFNO"],
        lcno: company["LCNO"]
      });
    }
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

    this.dataService.updateCompanyMaster(company).subscribe(
      (company: ICompany) => {
        this.router.navigate(["companylist"]);
      },
      err => console.log(err)
    );
  }
}
