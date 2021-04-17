import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Someil } from '../_Model/someil.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SommeilUserService {

  constructor(private http: HttpClient) { }
  
  getAllData(): Observable<Someil[]> {
    const optionRequete = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'mon-entete-personnalise':'maValeur'
      })};
    return this.http.get<Someil[]>('https://cors-anywhere.herokuapp.com/http://prod.kaisens.fr:811/api/sleep/?deviceid=93debd97-6564-454b-be33-35bd377a2563&startdate=1612310400000&enddate=1614729600000', optionRequete);
  }
}
