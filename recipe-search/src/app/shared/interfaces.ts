import { ModuleWithProviders } from '@angular/core';

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IRecipe {
  id: string,
  name?: String,
  category?: String,
  ingredients?: [IIngredient],
  directions?: [IDirection]
}

export interface IIngredient {
  ingredient?: String,
  quantity?: String
}

export interface IDirection {
  direction?: String
}

export interface IQuery {
  name?: string,
  category?: string,
  ingredients?: [{ingredient: string}]
}
