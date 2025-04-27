import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PizzeriaService } from '../../service/pizzeria.service';
import {PizzeriaDistanceDtoModel, PizzeriaShortDtoModel} from '../../models/PizzeriaShortDtoModel';

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
import {CreateOrderComponent} from '../../../order/components/create-order/create-order.component';

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
    CreateOrderComponent,
  ],
  templateUrl: './pizzeria-list.component.html',
  styleUrl: './pizzeria-list.component.css'
})
export class PizzeriaListComponent {
  private readonly _pizzeriaService = inject(PizzeriaService);
  pizzerias!: PizzeriaDistanceDtoModel[];

  activePanels: number[] = [];
  showCreateOrder: boolean = false;
  @ViewChild('createOrderSection') createOrderSection!: ElementRef;
  onPasserCommande() {
    this.showCreateOrder = true;

    setTimeout(() => {
      this.createOrderSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0); // attendre que le DOM affiche le bloc avant de scroller
  }



  constructor() {
    setTimeout(() => {
      this._pizzeriaService.getPizzeriasWithDistance().subscribe({
        next: datas => this.pizzerias = datas,
        error: err => console.log(err),
      });
    }, 500); // petit délai pour laisser le temps à getUserLocation()
  }




}
