import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {IngredientService} from '../../services/ingredient.service';
import {IngredientPriceDto} from '../../models/IngredientPriceDto';

@Component({
  selector: 'app-add-ingredient',
  imports: [
    Checkbox,
    FormsModule
  ],
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.css'
})
export class AddIngredientComponent {

  private readonly _ingredientService: IngredientService = inject(IngredientService);

  ingredients!: IngredientPriceDto[];
  selectedIngredient: { [key: string]: boolean } = {};

  @Output() ingredientEmet = new EventEmitter<{[key: string]: boolean}>();
  @Input() ingredientsAlreadyAdded: { [ingredientName: string]: boolean } = {};

  constructor()
  {
    this._ingredientService.findAll().subscribe({
      next: datas => {
        this.ingredients = datas;

        for (const ingredient of this.ingredients) {
          this.selectedIngredient[ingredient.name] = false;
        }
      },
      error: err => console.log(err),
    });
  }

  onIngredientChange() {
    this.ingredientEmet.emit(this.selectedIngredient);
  }

}
