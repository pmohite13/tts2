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
  IHoliday,
  IPagedResults,
  IHolidayResponse
} from "../../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class HolidayService {
  baseHolidayUrl: string = "http://localhost:3000/api/holidays";

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<IHoliday[]> {
    return this.http.get<IHoliday[]>(this.baseHolidayUrl).pipe(
      map((holidays: IHoliday[]) => {
        return holidays;
      })
    );
  }

  insertHolidayMaster(holiday: IHoliday): Observable<IHolidayResponse> {
    return this.http.post<IHolidayResponse>(this.baseHolidayUrl, holiday).pipe(
      map(data => {
        console.log("insert Holiday status: " + data.status);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteHoliday(
    hDate: Date,
    companyCode: string,
    departmentCode: string
  ): Observable<boolean> {
    return this.http
      .delete<boolean>(
        this.baseHolidayUrl +
          "/" +
          hDate +
          "/" +
          companyCode +
          "/" +
          departmentCode
      )
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
