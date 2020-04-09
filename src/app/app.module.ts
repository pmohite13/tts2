import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { ElectronService } from "./providers/electron.service";

import { WebviewDirective } from "./directives/webview.directive";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";
import { CompanyComponent } from "./components/master/company/company-new/company.component";
import { CompanyListComponent } from "./components/master/company/company-list/company-list.component";
import { DataService } from "./core/data.service";
import { BrowserXhr } from "@angular/http";
import { CustExtBrowserXhr } from "./cust-ext-browser-xhr";
import { CompanyEditComponent } from "./components/master/company/company-edit/company-edit.component";
import { SharedModule } from "./shared/shared.module";
import { DepartmentNewComponent } from "./components/master/department/department-new/department-new.component";
import { DepartmentEditComponent } from "./components/master/department/department-edit/department-edit.component";
import { DepartmentListComponent } from "./components/master/department/department-list/department-list.component";
import { DepartmentService } from "./core/services/department.service";
import { SectionNewComponent } from "./components/master/section/section-new/section-new.component";
import { SectionEditComponent } from "./components/master/section/section-edit/section-edit.component";
import { SectionListComponent } from "./components/master/section/section-list/section-list.component";
import { SectionService } from "./core/services/sectionservice";
import { GradeListComponent } from "./components/master/grade/grade-list/grade-list.component";
import { GradeNewComponent } from "./components/master/grade/grade-new/grade-new.component";
import { GradeEditComponent } from "./components/master/grade/grade-edit/grade-edit.component";
import { CategoryListComponent } from "./components/master/category/category-list/category-list.component";
import { CategoryNewComponent } from "./components/master/category/category-new/category-new.component";
import { CategoryEditComponent } from "./components/master/category/category-edit/category-edit.component";
import { HolidayListComponent } from "./components/master/holiday/holiday-list/holiday-list.component";
import { HolidayNewComponent } from "./components/master/holiday/holiday-new/holiday-new.component";
import { MAT_DATE_LOCALE } from "@angular/material";
import { ShiftListComponent } from "./components/master/shift/shift-list/shift-list.component";
import { ShiftNewComponent } from "./components/master/shift/shift-new/shift-new.component";
import { ShiftEditComponent } from "./components/master/shift/shift-edit/shift-edit.component";
// import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    CompanyComponent,
    CompanyListComponent,
    CompanyEditComponent,

    DepartmentNewComponent,
    DepartmentEditComponent,
    DepartmentListComponent,
    SectionNewComponent,
    SectionEditComponent,
    SectionListComponent,
    GradeListComponent,
    GradeNewComponent,
    GradeEditComponent,
    CategoryListComponent,
    CategoryNewComponent,
    CategoryEditComponent,
    HolidayListComponent,
    HolidayNewComponent,
    ShiftListComponent,
    ShiftNewComponent,
    ShiftEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    ElectronService,
    DataService,
    DepartmentService,
    SectionService,
    { provide: BrowserXhr, useClass: CustExtBrowserXhr },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
