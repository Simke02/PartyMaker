import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private propertyValueSubject = new Subject<any>();
  propertyValue$ = this.propertyValueSubject.asObservable();

  updatePropertyValue(value: any) {
    this.propertyValueSubject.next(value);
  }
}
