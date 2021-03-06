import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Someil } from '../_model/someil.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SommeilUserService {

  constructor(private http: HttpClient) { }
  
  getAllData(): Observable<Someil[]> {

    return this.http.get<Someil[]>(' https://morning-savannah-56718.herokuapp.com/http://prod.kaisens.fr:811/api/sleep/?deviceid=93debd97-6564-454b-be33-35bd377a2563&startdate=1612310400000&enddate=1614729600000');
  }
}
