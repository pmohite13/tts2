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
  ICategory,
  IPagedResults,
  ICategoryResponse
} from "../../shared/interfaces";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  baseCategoryUrl: string = "http://localhost:3000/api/category";

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.baseCategoryUrl).pipe(
      map((categories: ICategory[]) => {
        return categories;
      })
      // catchError(this.handleError)
    );
  }

  getCategoryByCode(categoryCode: string): Observable<ICategory> {
    return this.http
      .get<ICategory>(this.baseCategoryUrl + "/" + categoryCode)
      .pipe(catchError(this.handleError));
  }

  insertCategoryMaster(category: ICategory): Observable<ICategoryResponse> {
    return this.http
      .post<ICategoryResponse>(this.baseCategoryUrl, category)
      .pipe(
        map(data => {
          console.log("insert Category status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  updateCategoryMaster(category: ICategory): Observable<ICategoryResponse> {
    return this.http
      .put<ICategoryResponse>(
        this.baseCategoryUrl + "/" + category.cat,
        category
      )
      .pipe(
        map(data => {
          console.log("update category status: " + data.status);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteCategory(categoryCode: string): Observable<boolean> {
    return this.http
      .delete<boolean>(this.baseCategoryUrl + "/" + categoryCode)
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
