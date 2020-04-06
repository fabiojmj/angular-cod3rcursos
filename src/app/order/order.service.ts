import { Injectable } from "@angular/core";
import { ShoppingService } from "app/restaurant-detail/shopping/shopping.service";
import { CartItem } from "app/restaurant-detail/shopping/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import { Http, RequestOptions, Headers } from "@angular/http";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingService,
        private http: Http) { }

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem) {
        this.cartService.removeItem(item);
    }

    itemsValue(): number {
        return this.cartService.total();
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${MEAT_API}/orders/`, JSON.stringify(order),
            new RequestOptions({
                headers: headers
            }))
            .map(response => response.json())
            .map(order => order.id);
    }

    clear() {
        this.cartService.clear();
    }
}