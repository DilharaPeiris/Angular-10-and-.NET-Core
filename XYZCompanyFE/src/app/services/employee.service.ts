import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../models/employee';
import { handleHttpError } from 'src/app/shared/helper/api.helper'
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {}

    public getEmployeeList(): Observable<any[]> {
        return this.http
            .get<any[]>(this.createApiUrl('Employee'))
            .pipe(catchError(handleHttpError));
    }

    public getEmployee(id: number): Observable<any> {
        return this.http
            .get<any[]>(
                this.createApiUrl('Employee', id.toString())
            )
            .pipe(catchError(handleHttpError));
    }

    public addNewEmployee(newEmployee: any): Observable<number> {
        return this.http
            .post<{ id: number }>(
                this.createApiUrl('Employee'),
                newEmployee
            )
            .pipe(
                map(ret => ret.id),
                catchError(handleHttpError)
            );
    }

    public updateEmployee(updatedEmployee: any): Observable<any> {
        return this.http
            .put(
                this.createApiUrl(
                    'Employee',
                    updatedEmployee.id.toString()
                ),
                updatedEmployee
            )
            .pipe(catchError(handleHttpError));
    }

    public deleteEmployee(id: number) {
        return this.http
            .delete(this.createApiUrl('Employee', id.toString()))
            .pipe(catchError(handleHttpError));
    }

    public UploadPhoto(val:any){
        return this.http.post(
            this.createApiUrl('Employee'),
            val
        )
        .pipe(catchError(handleHttpError));
      }

    private createApiUrl(
        controllerName: string,
        methodAndParameters?: string
    ): string {
        const apiUrl = `${environment.apiUrl}/${controllerName}`;
        if (methodAndParameters) {
            return `${apiUrl}/${methodAndParameters}`;
        }
        return apiUrl;
    }
}
