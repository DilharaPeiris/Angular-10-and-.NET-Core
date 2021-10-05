import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


export function handleHttpError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
    }

    return throwError({
        ...error,
        localizedDescription: 'Something went wrong... :( Try again later :D.'
    });
}
