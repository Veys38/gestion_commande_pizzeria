import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PizzeriaService } from '../../service/pizzeria.service';
import { PizzeriaShortDtoModel } from '../../models/PizzeriaShortDtoModel';

// 👉 Nouveaux composants à importer !
import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent
} from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import {PizzaListComponent} from '../../../pizza/components/pizza-list/pizza-list.component';
import {AddIngredientComponent} from "../../../pizza_ingredient/components/add-ingredient/add-ingredient.component";

@Component({
  selector: 'app-pizzeria-list',
  standalone: true,
    imports: [
        CommonModule,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent,
        PizzaListComponent,
    ],
  templateUrl: './pizzeria-list.component.html',
  styleUrl: './pizzeria-list.component.css'
})
export class PizzeriaListComponent {
  private readonly _pizzeriaService = inject(PizzeriaService);
  pizzerias!: PizzeriaShortDtoModel[];

  activePanels: number[] = [];


  constructor() {
    this._pizzeriaService.findAll().subscribe({
      next: datas => this.pizzerias = datas,
      error: err => console.log(err),
    });
  }
}
