import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<any>();
  alert$ = this.alertSubject.asObservable();

  show(message: string, type: string = 'info') {
    this.alertSubject.next({ message, type });
  }
}
