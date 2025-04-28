import { of, Observable, BehaviorSubject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PizzeriaDistanceDtoModel } from '../models/PizzeriaShortDtoModel';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PizzeriaService {
  private readonly _http: HttpClient = inject(HttpClient);

  private userLocationSubject = new BehaviorSubject<{ latitude: number; longitude: number } | null>(null);
  userLocation$ = this.userLocationSubject.asObservable();

  constructor() {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocationSubject.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          console.warn("Géolocalisation impossible.");
          this.userLocationSubject.next(null);
        }
      );
    }
  }

  getPizzeriasWithDistance(): Observable<PizzeriaDistanceDtoModel[]> {
    return this.userLocation$.pipe(
      switchMap(location => {
        if (!location) return of([]);
        const url = `${environment.API_URL}/pizzeria/with-distance?lat=${location.latitude}&lon=${location.longitude}`;
        return this._http.get<PizzeriaDistanceDtoModel[]>(url);
      })
    );
  }
}
