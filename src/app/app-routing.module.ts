import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyComponent } from "./components/master/company/company-new/company.component";
import { CompanyListComponent } from "./components/master/company/company-list/company-list.component";
import { CompanyEditComponent } from "./components/master/company/company-edit/company-edit.component";
import { DepartmentListComponent } from "./components/master/department/department-list/department-list.component";
import { DepartmentNewComponent } from "./components/master/department/department-new/department-new.component";
import { DepartmentEditComponent } from "./components/master/department/department-edit/department-edit.component";
import { SectionListComponent } from "./components/master/section/section-list/section-list.component";
import { SectionNewComponent } from "./components/master/section/section-new/section-new.component";
import { SectionEditComponent } from "./components/master/section/section-edit/section-edit.component";
import { GradeListComponent } from "./components/master/grade/grade-list/grade-list.component";
import { GradeNewComponent } from "./components/master/grade/grade-new/grade-new.component";
import { GradeEditComponent } from "./components/master/grade/grade-edit/grade-edit.component";
import { CategoryListComponent } from "./components/master/category/category-list/category-list.component";
import { CategoryNewComponent } from "./components/master/category/category-new/category-new.component";
import { CategoryEditComponent } from "./components/master/category/category-edit/category-edit.component";
import { HolidayListComponent } from "./components/master/holiday/holiday-list/holiday-list.component";
import { HolidayNewComponent } from "./components/master/holiday/holiday-new/holiday-new.component";
import { ShiftListComponent } from "./components/master/shift/shift-list/shift-list.component";
import { ShiftNewComponent } from "./components/master/shift/shift-new/shift-new.component";
import { ShiftEditComponent } from "./components/master/shift/shift-edit/shift-edit.component";

const routes: Routes = [
  { path: "companylist", component: CompanyListComponent },
  { path: "company", component: CompanyComponent },
  { path: "companyedit/:companyCode", component: CompanyEditComponent },
  { path: "departmentlist", component: DepartmentListComponent },
  { path: "department", component: DepartmentNewComponent },
  {
    path: "departmentedit/:departmentCode",
    component: DepartmentEditComponent
  },
  { path: "sectionlist", component: SectionListComponent },
  { path: "section", component: SectionNewComponent },
  { path: "sectionedit/:divisionCode", component: SectionEditComponent },
  { path: "gradelist", component: GradeListComponent },
  { path: "grade", component: GradeNewComponent },
  { path: "gradeedit/:gradeCode", component: GradeEditComponent },
  { path: "categorylist", component: CategoryListComponent },
  { path: "category", component: CategoryNewComponent },
  { path: "categoryedit/:categoryCode", component: CategoryEditComponent },
  { path: "holidaylist", component: HolidayListComponent },
  { path: "holiday", component: HolidayNewComponent },
  { path: "shiftlist", component: ShiftListComponent },
  { path: "shift", component: ShiftNewComponent },
  { path: "shiftedit/:shiftCode", component: ShiftEditComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
