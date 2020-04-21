import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurant/restaurant.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('toogleSeach', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity:1,
        "max-height":"70px",
        "margin-top":"20px"
      })),
      transition('* => *',animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';

  restaurants: Restaurant[];

  constructor(private restauranteService: RestaurantService) { }

  ngOnInit() {
    this.restauranteService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toogleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
