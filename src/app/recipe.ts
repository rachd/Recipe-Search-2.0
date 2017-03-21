export class Recipe {
    id: number;
    title: string = '';
    source: string = '';
    ingredients: string[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
