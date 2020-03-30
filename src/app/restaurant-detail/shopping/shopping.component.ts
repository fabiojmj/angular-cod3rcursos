import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'mt-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  constructor(private shoppingService: ShoppingService) {

  }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppingService.items;
  }

  total(): number {
    return this.shoppingService.total();
  }

  clear() {
    this.shoppingService.clear();
  }

  removeItem(item) {    
    this.shoppingService.removeItem(item)
  }

  addItem(item) {
    this.shoppingService.addItem(item)
  }

}
