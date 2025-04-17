import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizzeria',
    pathMatch: 'full',
  },
  {
    path: 'pizzeria',
    loadComponent: () =>
      import('./features/pizzeria/pages/pizzeria-list/pizzeria-list.component').then(m => m.PizzeriaListComponent),
  },
  {
    path: 'pizza',
    loadComponent: () =>
      import('./features/pizza/components/pizza-list/pizza-list.component').then(m => m.PizzaListComponent),
  },
];
