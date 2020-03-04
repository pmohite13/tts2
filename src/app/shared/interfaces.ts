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
