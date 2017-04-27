import { RouterModule, Routes } from '@angular/router';
import { IRouting } from './shared/interfaces';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCardComponent } from './recipes/recipes-card/recipes-card.component';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: '**', pathMatch:'full', redirectTo: '/recipes' }
];

export const appRouting: IRouting = {
    routes: RouterModule.forRoot(routes),
    components: [ RecipesComponent, RecipesCardComponent ]
};
