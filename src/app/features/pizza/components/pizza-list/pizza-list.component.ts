import {Component, inject} from '@angular/core';
import {PizzaService} from '../../service/pizza.service';
import {FormsModule} from '@angular/forms';
import {Checkbox} from 'primeng/checkbox';
import {PizzaWithIngredientDto} from '../../models/PizzaDtoModel';
import {AddIngredientComponent} from '../../../pizza_ingredient/components/add-ingredient/add-ingredient.component';
import {IngredientPriceDto} from '../../../pizza_ingredient/models/IngredientPriceDto';
import {IngredientService} from '../../../pizza_ingredient/services/ingredient.service';
import {Button} from 'primeng/button';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel, AccordionTab} from 'primeng/accordion';

@Component({
  selector: 'app-pizza-list',
  imports: [
    Checkbox,
    FormsModule,
    Checkbox,
    AddIngredientComponent,
    Button,
    Accordion,
    AccordionTab,
  ],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent {

  private readonly _pizzaService: PizzaService = inject(PizzaService);
  private readonly _ingredientService: IngredientService = inject(IngredientService);

  pizzas!: PizzaWithIngredientDto[];
  ingredients!: IngredientPriceDto[];

  selectedPizzas: { [key: string]: boolean } = {};
  selectedIngredients: { [pizzaName: string]: { [ingredientName: string]: boolean } } = {};
  selectedAdditionalIngredients: { [key: string]: boolean } = {};



        constructor()
        {
          this._pizzaService.findAllWithIngredients().subscribe({
            next: datas => {
              this.pizzas = datas;

              for (const pizza of this.pizzas) {
                this.selectedPizzas[pizza.pizzaName] = false;

                this.selectedIngredients[pizza.pizzaName] = {};
                for (const ingredient of pizza.ingredients) {
                  this.selectedIngredients[pizza.pizzaName][ingredient.name] = true;
                }
              }
            },
            error: err => console.log(err),
          });
        }



  getTotalPrice(): number {
    if (!this.pizzas) return 0;

    let total = 0;

    for (const pizza of this.pizzas) {
      if (this.selectedPizzas[pizza.pizzaName]) {
        total += pizza.price;

        for (const ingredient of pizza.ingredients) {
          if (this.selectedIngredients[pizza.pizzaName]?.[ingredient.name]) {

          }else if (!this.selectedIngredients[pizza.pizzaName]?.[ingredient.name]){
            total -= ingredient.price;
          }
        }
      }
    }
    return total;
  }




}
