import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, throwError, timer } from 'rxjs';
import { catchError, map, retryWhen, mergeMap } from 'rxjs/operators';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get(url: string, data: any, skipErrorHandling = false, withCredentials = false, isRetryOn = false): Observable<any> {
    let request = this.http
      .get(url, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        observe: 'response',
        withCredentials: withCredentials
      })
      .pipe(
        map<any, any>(this.mapBody)
      );

    if (!skipErrorHandling) {
      request = request.pipe(catchError(this.handleError));
    }

    if (isRetryOn) {
      request = request.pipe(retryWhen(this.handleRetry));
    }

    return request;
  }

  // tslint:disable-next-line:no-any
  private mapBody(res: HttpEvent<any>): any {
    if (res instanceof HttpResponse) {
      return res.body;
    }
  }

  // tslint:disable-next-line
  private handleError(error: HttpErrorResponse | any): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      const body = error || null;
      return observableThrowError(body);
    } else {
      const errMsg = error && error.error ? error.error.message : error.toString();
      return observableThrowError(errMsg);
    }
  }

  // tslint:disable-next-line
  private handleRetry(attempts: Observable<any>): Observable<any> {
    return attempts.pipe(
      // tslint:disable-next-line:no-any
      mergeMap((error: any, i: number) => {
        error.attempt = i;

        // tslint:disable-next-line:no-any
        if (i === 3 || error.status < 500) {
          return throwError(error);
        }

        return timer((i + 1) * 200);
      })
    );
  }

}

