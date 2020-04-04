import { Injectable } from "@angular/core";
import { ShoppingService } from "app/restaurant-detail/shopping/shopping.service";
import { CartItem } from "app/restaurant-detail/shopping/cart-item.model";

@Injectable()
export class OrderService{
    constructor(private cartService: ShoppingService){}

    cartItems():CartItem[]{
        return this.cartService.items;
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem){
        this.cartService.removeItem(item);
    }

    itemsValue():number{
        return this.cartService.total();
    }
}