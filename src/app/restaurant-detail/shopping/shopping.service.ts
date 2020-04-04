import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-tem.model";

export class ShoppingService {
    items: CartItem[] = []

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items
            .find((mItem) => mItem.menuItem.id === item.id);
        if (foundItem) {
            this.increaseQty(foundItem);
        }
        else {
            this.items.push(new CartItem(item));
        }
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    increaseQty(item: CartItem) {
        item.quantidade = item.quantidade + 1;
    }

    decreaseQty(item: CartItem) {
        item.quantidade = item.quantidade - 1;
        if (item.quantidade === 0) {
            this.removeItem(item);
        }
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0);
    }
}