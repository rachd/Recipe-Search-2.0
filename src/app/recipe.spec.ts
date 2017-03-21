import {Recipe} from './recipe';

describe('Recipe', () => {
  it('should create an instance', () => {
    expect(new Recipe()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let recipe = new Recipe({
      title: 'hello',
      source: 'google',
      ingredients: ['lemons', 'salt', 'flour']
    });
    expect(recipe.title).toEqual('hello');
    expect(recipe.source).toEqual('google');
    expect(recipe.ingredients).toEqual(['lemons', 'salt', 'flour']);
  });
});
