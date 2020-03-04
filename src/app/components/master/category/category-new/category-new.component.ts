import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from "../../../../core/services/categoryservice";
import { Router } from "@angular/router";
import { ICategory, ICategoryResponse } from "../../../../shared/interfaces";
import { DUPLICATE_INSERT } from "../../../../shared/constants";

@Component({
  selector: "app-category-new",
  templateUrl: "./category-new.component.html",
  styleUrls: ["./category-new.component.scss"]
})
export class CategoryNewComponent implements OnInit {
  title: string;
  categoryFormGroup: FormGroup;
  showSummaryErrors: boolean;
  summaryErrors: string;
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private categoryDataService: CategoryService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.title = "Add New Category";
    });
  }

  private buildFormGroup() {
    this.categoryFormGroup = this.formBuilder.group({
      cat: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],

      catagoryName: ["", [Validators.maxLength(35)]]
    });
  }

  gotoCategoryList() {
    this.router.navigateByUrl("categorylist");
  }

  submit() {
    let category: ICategory;
    category = this.categoryFormGroup.value;

    this.categoryDataService.insertCategoryMaster(category).subscribe(
      (response: ICategoryResponse) => {
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
                "Category code '" +
                category.cat +
                "' already exist. Try other category code.";
            }
          }
        } else {
          this.showSummaryErrors = false;
          this.router.navigate(["categorylist"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
