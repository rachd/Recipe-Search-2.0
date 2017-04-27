import { Component, Input } from '@angular/core';

import { IRecipe } from '../../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'recipe-card',
  templateUrl: './recipes-card.component.html',
  styleUrls: ['./_recipes-card.component.scss']
})
export class RecipesCardComponent {
  @Input() recipe: IRecipe;

  constructor() { }

}
