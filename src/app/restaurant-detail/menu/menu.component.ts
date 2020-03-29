import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'app/restaurants/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../menu-item/menu-tem.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantsService: RestaurantService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(
      this.route
        .parent
        .snapshot
        .params['id']);
  }

  addMenuItem(item: MenuItem) {
    console.log(item);
  }

}
