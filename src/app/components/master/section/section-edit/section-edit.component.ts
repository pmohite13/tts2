import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IDivision, IDivisionResponse } from "../../../../shared/interfaces";
import { Router, ActivatedRoute } from "@angular/router";
import { SectionService } from "../../../../core/services/sectionservice";

@Component({
  selector: "app-section-edit",
  templateUrl: "./section-edit.component.html",
  styleUrls: ["./section-edit.component.scss"]
})
export class SectionEditComponent implements OnInit {
  title: string;
  divisionFormGroup: FormGroup;
  division: IDivision;
  divisionCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private divisionDataService: SectionService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.divisionCode = this.route.snapshot.params["divisionCode"];
    this.getDivisionByCode();
    this.ngZone.run(() => {
      this.title = "Edit Section";
    });
  }

  private buildFormGroup() {
    this.divisionFormGroup = this.formBuilder.group({
      divisionCode: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      divisionName: ["", [Validators.maxLength(45)]]
    });
  }

  private patchDivision(division: IDivision) {
    if (division) {
      this.divisionFormGroup.patchValue({
        divisionCode: division["DivisionCode"],
        divisionName: division["DivisionName"]
      });
    }
  }

  getDivisionByCode() {
    this.divisionDataService
      .getDivisionByCode(this.divisionCode)
      .subscribe((division: IDivision) => {
        this.division = division;
        this.patchDivision(this.division);
      });
  }

  gotoDivisionList() {
    this.router.navigateByUrl("sectionlist");
  }

  submit() {
    let division: IDivision;
    division = this.divisionFormGroup.value;

    this.divisionDataService.updateDivisionMaster(division).subscribe(
      (division: IDivisionResponse) => {
        this.router.navigate(["sectionlist"]);
      },
      err => console.log(err)
    );
  }
}
