import { RouterModule, Routes } from '@angular/router';
import { IRouting } from './shared/interfaces';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCardComponent } from './recipes/recipes-card/recipes-card.component';
import { RecipesFormComponent } from './recipes/recipes-form/recipes-form.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeFiltersComponent } from './recipes/recipe-filters/recipe-filters.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'recipes/edit/:id', component: RecipesFormComponent },
  { path: 'add-recipe', component: RecipesFormComponent },
  { path: '**', pathMatch:'full', redirectTo: '/recipes' }
];

export const appRouting: IRouting = {
    routes: RouterModule.forRoot(routes),
    components: [ RecipesComponent, RecipesCardComponent, RecipesFormComponent, RecipeDetailComponent, RecipeFiltersComponent ]
};
