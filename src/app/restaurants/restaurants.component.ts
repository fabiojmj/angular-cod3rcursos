import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurant/restaurant.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormArrayName, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { switchMap, tap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

import { Observable, from } from 'rxjs';

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
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';

  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restauranteService: RestaurantService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchTerm => this.restauranteService
            .restaurants(searchTerm)
            .pipe(catchError(error => from([]))))
      ).subscribe(restaurants => this.restaurants = restaurants)

    this.restauranteService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toogleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
