import { ModuleWithProviders } from '@angular/core';

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IRecipe {
  _id?: string,
  name: String,
  category: String,
  ingredients: [IIngredient]
}

export interface IIngredient {
  ingredient: String,
  quantity: String
}
