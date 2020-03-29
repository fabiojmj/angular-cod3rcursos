import { MenuItem } from "../menu-item/menu-tem.model";

export class CartItem {
    constructor(public menuItem: MenuItem,
        public quantidade: number = 1) { }

    value(): number {
        return this.menuItem.price * this.quantidade;
    }
}