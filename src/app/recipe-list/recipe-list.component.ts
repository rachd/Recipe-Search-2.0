import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  @Input()
  todos: Recipe[];

  @Output()
  toggleFavorite: EventEmitter<Recipe> = new EventEmitter();

  constructor() {
  }

  onToggleRecipeFavorite(recipe: Recipe) {
    this.toggleFavorite.emit(recipe);
  }

}
