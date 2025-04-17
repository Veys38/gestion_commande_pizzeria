export interface IngredientShortDto {
  id: string;
  name: string;
  price: number;
}

export interface PizzaWithIngredientDto {
  id: number;
  pizzaName: string;
  price: number;
  ingredients: IngredientShortDto[];
}

