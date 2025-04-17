import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PizzeriaShortDtoModel} from '../../pizzeria/models/PizzeriaShortDtoModel';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  findAll() {
    return this._http.get<PizzeriaShortDtoModel[]>(environment.API_URL + "/pizzeria");
  }
}
