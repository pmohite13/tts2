import { Component, OnInit, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ICategory, ICategoryResponse } from "../../../../shared/interfaces";
import { CategoryService } from "../../../../core/services/categoryservice";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-category-edit",
  templateUrl: "./category-edit.component.html",
  styleUrls: ["./category-edit.component.scss"]
})
export class CategoryEditComponent implements OnInit {
  title: string;
  categoryFormGroup: FormGroup;
  category: ICategory;
  categoryCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private categoryDataService: CategoryService
  ) {
    this.buildFormGroup();
  }

  ngOnInit() {
    this.categoryCode = this.route.snapshot.params["categoryCode"];
    this.getCategoryByCode();
    this.ngZone.run(() => {
      this.title = "Edit Category";
    });
  }

  private buildFormGroup() {
    this.categoryFormGroup = this.formBuilder.group({
      cat: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      categoryName: ["", [Validators.maxLength(45)]]
    });
  }

  private patchCategory(category: ICategory) {
    if (category) {
      this.categoryFormGroup.patchValue({
        cat: category["CAT"],
        categoryName: category["CATAGORYNAME"]
      });
    }
  }

  getCategoryByCode() {
    this.categoryDataService
      .getCategoryByCode(this.categoryCode)
      .subscribe((category: ICategory) => {
        this.category = category;
        this.patchCategory(this.category);
      });
  }

  gotoCategoryList() {
    this.router.navigateByUrl("categorylist");
  }

  submit() {
    let category: ICategory;
    category = this.categoryFormGroup.value;

    this.categoryDataService.updateCategoryMaster(category).subscribe(
      (category: ICategoryResponse) => {
        this.router.navigate(["categorylist"]);
      },
      err => console.log(err)
    );
  }
}
