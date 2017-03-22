import { Component } from '@angular/core';
import { RecipeDataService } from './recipe-data.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private recipeDataService: RecipeDataService) {
  }

  onToggleRecipeFavorite(recipe: Recipe) {
    this.recipeDataService.toggleRecipeFavorite(recipe);
  }
}
