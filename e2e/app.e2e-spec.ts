import { RecipeSearchPage } from './app.po';

describe('recipe-search App', () => {
  let page: RecipeSearchPage;

  beforeEach(() => {
    page = new RecipeSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
