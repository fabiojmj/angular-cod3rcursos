import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import "rxjs/add/operator/do"

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup;

  paymentOptions: RadioOption[] = [
    { 'label': "Dinheiro", value: 'MON' },
    { 'label': "Cartão", value: 'DEB' },
    { 'label': "Cartão Refeição", value: 'REF' },
  ]
  orderId: any;

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  delivery: number = 8;

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmed: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, {
      validator: OrderComponent.equalTo
    })
  }

  static equalTo(group: AbstractControl): { [Key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmed = group.get('emailConfirmed');

    if (!email || !emailConfirmed) {
      return undefined;
    }

    if (email.value !== emailConfirmed.value) {
      return { emailsNotMatch: true }
    }

    return undefined;
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
      .do((orderId: string)=>{
        this.orderId = orderId
      })
      .subscribe(() => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear();
      });    
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

}
