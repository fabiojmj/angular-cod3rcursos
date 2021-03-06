import { Injectable } from "@angular/core";
import { ShoppingService } from "app/restaurant-detail/shopping/shopping.service";
import { CartItem } from "app/restaurant-detail/shopping/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/";

import { map } from 'rxjs/operators';


import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingService,
        private http: HttpClient) { }

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
        return this.http.post<Order>(`${MEAT_API}/orders/`, order)
            .pipe(map(order => order.id))
    }

    clear() {
        this.cartService.clear();
    }
}