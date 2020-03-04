import { CompanyComponent } from "../components/master/company/company-new/company.component";
import { ElectronService } from "../providers/electron.service";

export const menuTemplate = [
  {
    label: "Master",
    submenu: [
      {
        label: "Click me",
        click: () => {
          console.log("Sub menu clicked!");
          // openCompanyDialog();
        },
        accelerator: "Ctrl+N"
      }
    ]
  }
];

export const DUPLICATE_INSERT = "Violation of PRIMARY KEY constraint";
