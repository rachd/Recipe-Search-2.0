import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { IRecipe } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./_recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  title: String;
  recipes: IRecipe[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.title = "Recipes";
    this.getRecipes();
  }

  getRecipes() {
    this.dataService.getRecipes({}).subscribe((recipes: IRecipe[]) => this.recipes = recipes);
  }

}
