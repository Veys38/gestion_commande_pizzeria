import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PizzaWithIngredientDto} from '../models/PizzaDtoModel';


@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private readonly _http: HttpClient = inject(HttpClient);

  constructor() { }

  findAllWithIngredients() {
    return this._http.get<PizzaWithIngredientDto[]>(environment.API_URL + "/pizza/with-ingredients");
  }
}
