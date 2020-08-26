import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import {
  IEmployeeShift,
  IPagedResults,
  IEmployeeShiftResponse,
  IEmployee,
} from "../../shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  baseEmployeeShiftUrl: string = "http://localhost:3000/api/employees";

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseEmployeeShiftUrl).pipe(
      map((employeeShifts: IEmployee[]) => {
        return employeeShifts;
      })
      // catchError(this.handleError)
    );
  }

  getEmployeeByCode(payCode: string): Observable<IEmployeeShift> {
    return this.http
      .get<IEmployeeShift>(this.baseEmployeeShiftUrl + "/" + payCode)
      .pipe(catchError(this.handleError));
  }

  insertEmployeeMaster(
    employeeShift: IEmployeeShift
  ): Observable<IEmployeeShiftResponse> {
    return this.http
      .post<IEmployeeShiftResponse>(this.baseEmployeeShiftUrl, employeeShift)
      .pipe(
        map((data) => {
          console.log("insert employee Shift status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  updateEmployeeMaster(
    shift: IEmployeeShift
  ): Observable<IEmployeeShiftResponse> {
    return this.http
      .put<IEmployeeShiftResponse>(
        this.baseEmployeeShiftUrl + "/" + shift.PAYCODE,
        shift
      )
      .pipe(
        map((data) => {
          console.log("update employee shift status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteEmployee(payCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseEmployeeShiftUrl + "/" + payCode)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error("server error:", error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || "Node.js server error");
  }
}
