import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
    constructor(private http: HttpClient,) { }

  getBlogs(): Observable<any> {
    const subject = new Subject<any>();
    this.http.get(`https://jsonplaceholder.typicode.com/posts`).subscribe((responseData: any) => {
        subject.next(responseData);
    }, (error) => {
        const dataModel = error;
        subject.next(dataModel.error);
    });
    return subject.asObservable();
}
}
