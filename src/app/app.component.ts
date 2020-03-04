import { Component, NgZone } from "@angular/core";
import { ElectronService } from "./providers/electron.service";
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from "../environments/environment";
import { MatDialog } from "@angular/material";
import { CompanyComponent } from "./components/master/company/company-new/company.component";
import { menuTemplate } from "./shared/constants";
import { Router } from "@angular/router";
import { CompanyListComponent } from "./components/master/company/company-list/company-list.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: string;
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private router: Router
  ) {
    translate.setDefaultLang("en");
    console.log("AppConfig", AppConfig);
    this.ngZone.run(() => {
      if (electronService.isElectron()) {
        console.log("Mode electron");
        console.log("Electron ipcRenderer", electronService.ipcRenderer);
        console.log("NodeJS childProcess", electronService.childProcess);
      } else {
        console.log("Mode web");
      }
    });
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on("open-company", (event, arg) => {
      this.ngZone.run(() => {
        // this.openCompanyDialog();
        this.router.navigateByUrl("companylist");
      });
    });
    this.electronService.ipcRenderer.on("open-department", (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("departmentlist");
      });
    });
    this.electronService.ipcRenderer.on("open-division", (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("sectionlist");
      });
    });
    this.electronService.ipcRenderer.on("open-grade", (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("gradelist");
      });
    });
    this.electronService.ipcRenderer.on("open-category", (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("categorylist");
      });
    });
    this.electronService.ipcRenderer.on("open-holiday", (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("holidaylist");
      });
    });
    this.electronService.ipcRenderer.on("open-shift", (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl("shiftlist");
      });
    });
  }

  openCompanyDialog() {
    // this.router.navigate(['/company']);
    // const dialogRef = this.dialog.open(CompanyComponent, { disableClose: true });
    const dialogRef = this.dialog.open(CompanyListComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
