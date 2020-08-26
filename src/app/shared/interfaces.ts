export interface PromptDialogData {
  title: string;
  yesButton: string;
  noButton: string;
}

export interface ICompany {
  companyCode: string;
  companyName: string;
  companyAddress: string;
  shortName: string;
  pannum: string;
  tanNumber: string;
  pfno: string;
  lcno: string;
  tdsCircle: string;
}

export interface IDepartment {
  departmentCode: string;
  departmentName: string;
  departmentHead: string;
  emailId: string;
}

export interface IDivision {
  divisionCode: string;
  divisionName: string;
}

export interface IPagedResults<T> {
  totalRecords: number;
  results: T;
}

export interface ICompanyrResponse {
  company: ICompany;
  status: boolean;
  error: string;
}

export interface IDepartmentResponse {
  department: IDepartment;
  status: boolean;
  error: string;
}

export interface IDivisionResponse {
  division: IDivision;
  status: boolean;
  error: string;
}

export interface IGrade {
  gradeCode: string;
  gradeName: string;
}

export interface IGradeResponse {
  grade: IGrade;
  status: boolean;
  error: string;
}

export interface ICategory {
  cat: string;
  catagoryName: string;
}

export interface ICategoryResponse {
  category: ICategory;
  status: boolean;
  error: string;
}

export interface IHoliday {
  hDate: Date;
  holiday: string;
  adjustmentHoliday: Date;
  otFactor: number;
  companyCode: string;
  departmentCode: string;
}

export interface IHolidayResponse {
  holiday: IHoliday;
  status: boolean;
  error: string;
}

export interface IShift {
  shift: string;
  startTime: Date;
  endTime: Date;
  lunchTime: Date;
  lunchDuration: number;
  lunchEndTime: Date;
  otStartAfter: number;
  otDeductHrs: number;
  lunchDeduction: number;
  shiftPosition: string;
  shiftDuration: number;
  otDeductAfter: number;
  chkNightShiftAfter12: string;
}

export interface IShiftResponse {
  shift: IShift;
  status: boolean;
  error: string;
}

export interface IEmployee {
  ACTIVE: string;
  PAYCODE: string;
  EMPNAME: string;
  GUARDIANNAME: string;
  DateOFBIRTH: Date;
  DateOFJOIN: Date;
  PRESENTCARDNO: string;
  COMPANYCODE: string;
  DEPARTMENTCODE: string;
  CAT: string;
  SEX: string;
  ISMARRIED: string;
  BUS: string;
  QUALIFICATION: string;
  EXPERIENCE: string;
  DESIGNATION: string;
  ADDRESS1: string;
  PINCODE1: string;
  TELEPHONE1: string;
  E_MAIL1: string;
  ADDRESS2: string;
  PINCODE2: string;
  TELEPHONE2: string;
  BLOODGROUP: string;
  EMPPHOTO: string;
  EMPSIGNATURE: string;
  DivisionCode: string;
  GradeCode: string;
  Leavingdate: string;
  LeavingReason: string;
  VehicleNo: string;
  PFNO: string;
  PF_NO: number;
  ESINO: string;
  AUTHORISEDMACHINE: string;
  EMPTYPE: string;
  BankAcc: string;
  DATEOFRETIREMENT: Date;
  bankcode: string;
}

export interface IEmployeeShift {
  ACTIVE: string;
  PAYCODE: string;
  EMPNAME: string;
  DateOFBIRTH: Date;
  DateOFJOIN: Date;
  CARDNO: string;
  SHIFT: string;
  SHIFTTYPE: string;
  SHIFTPATTERN: string;
  SHIFTREMAINDAYS: number;
  LASTSHIFTPERFORMED: string;
  INONLY: string;
  ISPUNCHALL: string;
  ISTIMELOSSALLOWED: string;
  ALTERNATE_OFF_DAYS: string;
  CDAYS: number;
  ISROUNDTHECLOCKWORK: string;
  ISOT: string;
  OTRATE: string;
  FIRSTOFFDAY: string;
  SECONDOFFTYPE: string;
  HALFDAYSHIFT: string;
  SECONDOFFDAY: string;
  PERMISLATEARRIVAL: number;
  PERMISEARLYDEPRT: number;
  ISAUTOSHIFT: string;
  ISOUTWORK: string;
  MAXDAYMIN: number;
  ISOS: string;
  AUTH_SHIFTS: string;
  TIME: number;
  SHORT: number;
  HALF: number;
  ISHALFDAY: string;
  ISSHORT: string;
  TWO: string;
  OW: string;
  LateArrvMark: string;
  NolateArrv: string;
  LateArriv: string;
  EarlyDeptMark: string;
  NoEarlyDept: string;
  EarlyDept: string;
  AllwSecondShit: string;
  SecondShiftDay: string;
  SecondShift: string;
  AlternateShiftDays: string;
}

export interface IEmployeeResponse {
  employee: IEmployee;
  status: boolean;
  error: string;
}

export interface IEmployeeShiftResponse {
  employeeShift: IEmployeeShift;
  status: boolean;
  error: string;
}
