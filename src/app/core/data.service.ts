import { Injectable } from "@angular/core";

//Using the new HttpClientModule now. If you're still on < Angular 4.3 see the
//data.service.ts file instead (simplify rename it to the name
//of this file to use it instead)
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import {
  ICompany,
  IPagedResults,
  ICompanyrResponse,
  IDepartment
} from "../shared/interfaces";
import { debug } from "util";

@Injectable()
export class DataService {
  baseCompaniesUrl: string = "http://localhost:3000/api/companies";

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(this.baseCompaniesUrl).pipe(
      map((companies: ICompany[]) => {
        return companies;
      })
      // catchError(this.handleError)
    );
  }

  getCompanyByCode(companyCode: string): Observable<ICompany> {
    return this.http
      .get<ICompany>(this.baseCompaniesUrl + "/" + companyCode)
      .pipe(catchError(this.handleError));
  }

  insertCompanyMaster(company: ICompany): Observable<ICompany> {
    return this.http
      .post<ICompanyrResponse>(this.baseCompaniesUrl, company)
      .pipe(
        map(data => {
          console.log("insert Company status: " + data.status);
          return data.company;
        }),
        catchError(this.handleError)
      );
  }

  updateCompanyMaster(company: ICompany): Observable<ICompany> {
    return this.http
      .put<ICompanyrResponse>(
        this.baseCompaniesUrl + "/" + company.companyCode,
        company
      )
      .pipe(
        map(data => {
          console.log("update company status: " + data.status);
          return data.company;
        }),
        catchError(this.handleError)
      );
  }

  deleteCompany(companyCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseCompaniesUrl + "/" + companyCode)
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
