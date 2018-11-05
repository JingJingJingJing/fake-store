import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppInfo } from './appInfo';
import { APPS } from './mock-appInfos';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getApps(): Observable<AppInfo[]> {
    return of(APPS);
  }
}
