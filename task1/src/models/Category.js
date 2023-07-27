let categoryIdCounter = 1;
//Describes Category Object
export default class Category {
    constructor(name, symbol) {
        this.id = categoryIdCounter++;
        this.name = name;
        this.symbol = symbol;
    }
}
