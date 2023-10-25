import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alkoholna } from '../models/alkoholna.model';
import { Bezalkoholna } from '../models/bezalkoholna.model';
import { Rekviziti } from '../models/rekviziti.model';

@Injectable({
  providedIn: 'root'
})
export class ChangeProductService {

  baseApiUrl: string = 'http://localhost:5069';

  constructor(private http: HttpClient) { }

  UpdateAlkoholnoPice(alk: Alkoholna): Observable<Alkoholna>{
    return this.http.put<Alkoholna>(this.baseApiUrl+'/api/AlkoholnoPice/UpdateAlkoholnoPice/'+alk.id, alk);
  }

  UpdateBezAlkPice(bezalk: Bezalkoholna): Observable<Bezalkoholna>{
    return this.http.put<Bezalkoholna>(this.baseApiUrl+'/api/BezalkoholnoPice/UpdateBezalkoholnoPice/'+bezalk.id, bezalk);
  }

  UpdateRekvizit(rekv: Rekviziti): Observable<Rekviziti>{
    return this.http.put<Rekviziti>(this.baseApiUrl+'/api/Rekviziti/UpdateRekvizit/'+rekv.id, rekv);
  }
}
