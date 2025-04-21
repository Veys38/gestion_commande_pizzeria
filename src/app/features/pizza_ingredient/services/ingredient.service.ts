import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {IngredientPriceDto} from '../models/IngredientPriceDto';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  findAll() {
    return this._http.get<IngredientPriceDto[]>(environment.API_URL + "/ingredient");
  }
}
