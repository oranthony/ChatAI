import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Service that allows any component to trigger (open) the side navigation drawer
 */

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private subject = new Subject<any>();

  constructor() { }

  openNavDrawer() {
    this.subject.next("");
  }

  getOpenNavDrawerEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
