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
  IDivision,
  IPagedResults,
  IDivisionResponse
} from "../../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class SectionService {
  baseSectionsUrl: string = "http://localhost:3000/api/sections";

  constructor(private http: HttpClient) {}

  getDivisions(): Observable<IDivision[]> {
    return this.http.get<IDivision[]>(this.baseSectionsUrl).pipe(
      map((divisions: IDivision[]) => {
        return divisions;
      })
      // catchError(this.handleError)
    );
  }

  getDivisionByCode(divisionCode: string): Observable<IDivision> {
    return this.http
      .get<IDivision>(this.baseSectionsUrl + "/" + divisionCode)
      .pipe(catchError(this.handleError));
  }

  insertDivisionMaster(division: IDivision): Observable<IDivisionResponse> {
    return this.http
      .post<IDivisionResponse>(this.baseSectionsUrl, division)
      .pipe(
        map(data => {
          console.log("insert Division status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  updateDivisionMaster(division: IDivision): Observable<IDivisionResponse> {
    return this.http
      .put<IDivisionResponse>(
        this.baseSectionsUrl + "/" + division.divisionCode,
        division
      )
      .pipe(
        map(data => {
          console.log("update division status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteDivision(divisionCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseSectionsUrl + "/" + divisionCode)
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
