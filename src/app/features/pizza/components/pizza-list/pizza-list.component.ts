import {Component, EventEmitter, inject, Output} from '@angular/core';
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
  selectedPizzaName: string | null = null;

  isValidated: boolean = false;

  selectedIngredients: { [pizzaName: string]: { [ingredientName: string]: boolean } } = {};
  selectedAdditionalIngredients: { [key: string]: boolean } = {};

  quantities: number = 1;

  validatedTickets: {
    pizzaName: string;
    ingredients: string[];
    ingredientSupplement: string[];
    quantity: number;
  }[] = [];


  onAdditionalIngredientsChange(updatedIngredients: { [key: string]: boolean }) {
    this.selectedAdditionalIngredients = updatedIngredients;
  }

  constructor() {
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
    this._ingredientService.findAll().subscribe({
      next: data => {
        this.ingredients = data;
        for (const ingredient of this.ingredients) {
          this.selectedAdditionalIngredients[ingredient.name] = false;
        }
      }
    });

  }


  selectPizza(pizzaName: string): void {
    if (!this.selectedPizzaName) {
      this.selectedPizzaName = pizzaName;
      this.selectedPizzas[pizzaName] = true;
    } else if (this.selectedPizzaName === pizzaName) {
      this.selectedPizzaName = null;
      this.selectedPizzas[pizzaName] = false;
    }
  }


  getTotalPrice(): number {
    if (!this.pizzas) return 0;

    let total = 0;

    for (const pizza of this.pizzas) {
      if (this.selectedPizzas[pizza.pizzaName]) {
        total += pizza.price;

        if (!this.ingredients) return total;

        for (const ingredient of pizza.ingredients) {
          if (!this.selectedIngredients[pizza.pizzaName]?.[ingredient.name]) {
            total -= ingredient.price;
          }

        }
      }
    }
    for (const ingredient of this.ingredients) {
      if (this.selectedAdditionalIngredients[ingredient.name]) {
        total += ingredient.price;
      }
    }

    return Math.round((total * this.quantities) * 100) / 100;
  }



  ajouterPizzaAuTicket(){
    const pizza = this.pizzas.find(p => p.pizzaName === this.selectedPizzaName);
    const selected = this.selectedIngredients[this.selectedPizzaName!];
    const additionalSelected = this.selectedAdditionalIngredients;

    const entries = Object.entries(selected);
    const filtered = entries.filter(([_,checked]) => checked);
    const maped = filtered.map(([name])=>name);

    const additionalIngredients = Object.entries(additionalSelected).filter(([_,checked]) => checked).map((([name])=>name));


    if (!pizza) {
      return;
    }

    this.validatedTickets.push({ pizzaName: pizza.pizzaName, ingredients: maped, ingredientSupplement: additionalIngredients ,quantity: this.quantities });

    this.resetSelection();
  }

  resetSelection(){
    for (const pizza of this.pizzas) {
      this.selectedPizzas[pizza.pizzaName] = false;
      this.selectedIngredients[pizza.pizzaName] = {};
    }
    this.selectedPizzaName = null;
    for (const ingredient of this.ingredients) {
      this.selectedAdditionalIngredients[ingredient.name] = false;
    }
    this.quantities = 1;
  }


  deletePizza(name: string): void {

    // this.validatedTickets.filter()
  }


  validatePizza():void{
    this.isValidated=true;
    this.selectedPizzaName = null;
  }




}
