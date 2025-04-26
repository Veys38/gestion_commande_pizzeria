import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PizzeriaShortDtoModel} from '../models/PizzeriaShortDtoModel';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PizzeriaService {

  private readonly _http: HttpClient = inject(HttpClient);



  findAll() {
    return this._http.get<PizzeriaShortDtoModel[]>(environment.API_URL + "/pizzeria");
  }

  userLocation: { latitude: number; longitude: number } | null = null;

  constructor() {
    this.getUserLocation();
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

  getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }






}
