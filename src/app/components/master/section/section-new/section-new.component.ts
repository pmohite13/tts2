import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SectionService } from "../../../../core/services/sectionservice";
import { Router } from "@angular/router";
import { IDivisionResponse, IDivision } from "../../../../shared/interfaces";
import { DUPLICATE_INSERT } from "../../../../shared/constants";

@Component({
  selector: "app-section-new",
  templateUrl: "./section-new.component.html",
  styleUrls: ["./section-new.component.scss"]
})
export class SectionNewComponent implements OnInit {
  title: string;
  divisionFormGroup: FormGroup;
  showSummaryErrors: boolean;
  summaryErrors: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private divisionDataService: SectionService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Section";
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

  gotoDivisionList() {
    this.router.navigateByUrl("sectionlist");
  }

  submit() {
    let division: IDivision;
    division = this.divisionFormGroup.value;

    this.divisionDataService.insertDivisionMaster(division).subscribe(
      (response: IDivisionResponse) => {
        if (response.error) {
          this.showSummaryErrors = true;
          if (
            response.error["originalError"] &&
            response.error["originalError"]["info"]
          ) {
            let isDuplicateEntry = response.error["originalError"]["info"][
              "message"
            ]
              .toString()
              .indexOf(DUPLICATE_INSERT);
            if (isDuplicateEntry != -1) {
              this.summaryErrors =
                "Division code '" +
                division.divisionCode +
                "' already exist. Try other division code.";
            }
          }
        } else {
          this.showSummaryErrors = false;
          this.router.navigate(["sectionlist"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
