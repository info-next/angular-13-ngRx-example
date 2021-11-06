import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Program } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  root = environment.apiUrls.reports;

  
    constructor(private http: HttpClient,) { }

  getPublishedProgram(pageNo:string, pageSize:string, programType:string): Observable<Program> {
    const subject = new Subject<Program>();
    this.http.get(`${this.root}/programs/listPublishOrUnpublish?pageNo=${pageNo}&pageSize=${pageSize}&programType=${programType}`).subscribe((responseData: any) => {
        if (responseData.statusCode !== 200) {
            throw new Error('This request has failed ' + responseData.status);
        }
        const dataModel = responseData;
        if (!dataModel.isSuccess) {
            if (responseData.status === 200) {
                throw new Error(dataModel.code || dataModel.message || 'failed');
            } else {
                throw new Error(responseData.status + '');
            }
        }
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}
}
