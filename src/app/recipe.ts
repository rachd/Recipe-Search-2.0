export class Recipe {
    id: number;
    title: string = '';
    source: string = '';
    ingredients: string[] = [];
    favorite: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
