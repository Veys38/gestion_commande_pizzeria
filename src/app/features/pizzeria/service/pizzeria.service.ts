import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PizzeriaDistanceDtoModel, PizzeriaShortDtoModel} from '../models/PizzeriaShortDtoModel';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PizzeriaService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() {
    this.getUserLocation();
  }

  userLocation: { latitude: number; longitude: number } | null = null;



  findAll() {
    return this._http.get<PizzeriaShortDtoModel[]>(environment.API_URL + "/pizzeria");
  }



  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log("Position de l'utilisateur :", this.userLocation);
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.warn("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  }



  getPizzeriasWithDistance(){
    if (!this.userLocation) {
      console.warn("Position utilisateur non encore disponible.");
      return;
    }
    const { latitude, longitude } = this.userLocation;
    const url = `${environment.API_URL}/pizzeria/with-distance?lat=${latitude}&lon=${longitude}`;
    return this._http.get<PizzeriaDistanceDtoModel[]>(url);
  }

}
