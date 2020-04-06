import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOption[] = [
    { 'label': "Dinheiro", value: 'MON' },
    { 'label': "Cartão", value: 'DEB' },
    { 'label': "Cartão Refeição", value: 'REF' },
  ]

  constructor(private orderService: OrderService,
    private router: Router) { }

  delivery: number = 8;

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantidade, item.menuItem.id));
    this.orderService.checkOrder(order)
      .subscribe(() => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear();
      });
    console.log(order);
  }

}
