import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { IRecipe, IIngredient } from '../../shared/interfaces';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss']
})
export class RecipesFormComponent implements OnInit {

  recipe: IRecipe = {
    name: '',
    category: '',
    ingredients: [{ingredient: "Eggs", quantity: "2"}]
  }
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  submit() {
    this.dataService.insertRecipe(this.recipe);
  }

}
