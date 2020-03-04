import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import {
  IDepartment,
  IPagedResults,
  IDepartmentResponse
} from "../../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class DepartmentService {
  baseDepartmentsUrl: string = "http://localhost:3000/api/departments";

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(this.baseDepartmentsUrl).pipe(
      map((departments: IDepartment[]) => {
        return departments;
      })
      // catchError(this.handleError)
    );
  }

  getDepartmentByCode(departmentCode: string): Observable<IDepartment> {
    return this.http
      .get<IDepartment>(this.baseDepartmentsUrl + "/" + departmentCode)
      .pipe(catchError(this.handleError));
  }

  insertDepartmentMaster(
    department: IDepartment
  ): Observable<IDepartmentResponse> {
    return this.http
      .post<IDepartmentResponse>(this.baseDepartmentsUrl, department)
      .pipe(
        map(data => {
          console.log("insert Department status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  updateDepartmentMaster(department: IDepartment): Observable<IDepartment> {
    return this.http
      .put<IDepartmentResponse>(
        this.baseDepartmentsUrl + "/" + department.departmentCode,
        department
      )
      .pipe(
        map(data => {
          console.log("update department status: " + data.status);
          return data.department;
        }),
        catchError(this.handleError)
      );
  }

  deleteDeparment(departmentCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseDepartmentsUrl + "/" + departmentCode)
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
