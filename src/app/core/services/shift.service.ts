import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { IShift, IPagedResults, IShiftResponse } from "../../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class ShiftService {
  baseShiftUrl: string = "http://localhost:3000/api/shifts";

  constructor(private http: HttpClient) {}

  getShifts(): Observable<IShift[]> {
    return this.http.get<IShift[]>(this.baseShiftUrl).pipe(
      map((shifts: IShift[]) => {
        return shifts;
      })
      // catchError(this.handleError)
    );
  }

  getShiftByCode(shiftCode: string): Observable<IShift> {
    return this.http
      .get<IShift>(this.baseShiftUrl + "/" + shiftCode)
      .pipe(catchError(this.handleError));
  }

  insertShiftMaster(shift: IShift): Observable<IShiftResponse> {
    return this.http.post<IShiftResponse>(this.baseShiftUrl, shift).pipe(
      map(data => {
        console.log("insert Shift status: " + data.status);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateShiftMaster(shift: IShift): Observable<IShiftResponse> {
    return this.http
      .put<IShiftResponse>(this.baseShiftUrl + "/" + shift.shift, shift)
      .pipe(
        map(data => {
          console.log("update shift status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteShift(shiftCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseShiftUrl + "/" + shiftCode)
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
