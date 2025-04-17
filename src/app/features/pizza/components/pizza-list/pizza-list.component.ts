import {Component, inject} from '@angular/core';
import {PizzaService} from '../../service/pizza.service';
import {FormsModule} from '@angular/forms';
import {Checkbox} from 'primeng/checkbox';
import {IngredientShortDto, PizzaWithIngredientDto} from '../../models/PizzaDtoModel';

@Component({
  selector: 'app-pizza-list',
  imports: [
    Checkbox,
    FormsModule,
    Checkbox,
  ],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent {

  private readonly _pizzaService: PizzaService = inject(PizzaService);

  pizzas!: PizzaWithIngredientDto[];
  ingredients!: IngredientShortDto[];

  selectedPizzas: { [key: string]: boolean } = {};
  selectedIngredients: { [key: string]: boolean } = {};


  constructor() {
    this._pizzaService.findAllWithIngredients().subscribe({
      next: datas => {
        this.pizzas = datas;

        console.log('Pizzas chargées :', this.pizzas);

        for (const pizza of this.pizzas) {

          this.selectedPizzas[pizza.pizzaName] = false;

          for (const ingredient of pizza.ingredients) {
            this.selectedIngredients[ingredient.name] = true;
          }

        }

      },
      error: err => console.log(err),
    });
  }

}
