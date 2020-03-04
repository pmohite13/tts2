import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { IGrade, IPagedResults, IGradeResponse } from "../../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class GradeService {
  baseGradesUrl: string = "http://localhost:3000/api/grades";

  constructor(private http: HttpClient) {}

  getGrades(): Observable<IGrade[]> {
    return this.http.get<IGrade[]>(this.baseGradesUrl).pipe(
      map((grades: IGrade[]) => {
        return grades;
      })
      // catchError(this.handleError)
    );
  }

  getGradeByCode(gradeCode: string): Observable<IGrade> {
    return this.http
      .get<IGrade>(this.baseGradesUrl + "/" + gradeCode)
      .pipe(catchError(this.handleError));
  }

  insertGradeMaster(grade: IGrade): Observable<IGradeResponse> {
    return this.http.post<IGradeResponse>(this.baseGradesUrl, grade).pipe(
      map(data => {
        console.log("insert Grade status: " + data.status);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateGradeMaster(grade: IGrade): Observable<IGradeResponse> {
    return this.http
      .put<IGradeResponse>(this.baseGradesUrl + "/" + grade.gradeCode, grade)
      .pipe(
        map(data => {
          console.log("update grade status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteGrade(gradeCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseGradesUrl + "/" + gradeCode)
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
