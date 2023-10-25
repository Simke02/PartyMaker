import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alkoholna } from '../models/alkoholna.model';
import { Bezalkoholna } from '../models/bezalkoholna.model';
import { Rekviziti } from '../models/rekviziti.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }

  PrikaziHomeAlkoholnaPica(): Observable<Alkoholna[]>{
    return this.http.get<Alkoholna[]>(this.baseApiUrl+'/api/AlkoholnoPice/PrikaziHomeAlkoholnaPica');
  }

  PrikaziHomeBezAlkPica(): Observable<Bezalkoholna[]>{
    return this.http.get<Bezalkoholna[]>(this.baseApiUrl+'/api/BezalkoholnoPice/PrikaziHomeBezAlkPica');
  }

  PrikaziHomeRekvizite(): Observable<Rekviziti[]>{
    return this.http.get<Rekviziti[]>(this.baseApiUrl+'/api/Rekviziti/PrikaziHomeRekvizite');
  }
}
