import { Restaurant } from "./restaurant.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs/Observable";

import { ErrorHandler } from "app/app.erro-handler"

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { RestaurantDetailComponent } from "app/restaurant-detail/restaurant-detail.component";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-tem.model";

@Injectable()

export class RestaurantService {


  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined

    if (search) {
      params = new HttpParams().set('q', search);
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {
      params: params
    })
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }
}