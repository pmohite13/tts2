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
export const MASK_TIME_FORMAT = [/[0-2]/, /\d/, ":", /[0-5]/, /\d/];
export const SHIFT_POSITIONS = ["DAY", "NIGHT", "HALFDAY"];
export const ZERO_TIME_VALUE = "00:00";
export const TIME_FORMAT_SEPERATOR = ':';
export const DECIMAL_FORMAT_SEPERATOR = '.';
export const GET_12_HOURS = 12;
export const GET_MIN_MINUTES_UNIT = 0.59;
export const GET_60_MINUTES = 60;

