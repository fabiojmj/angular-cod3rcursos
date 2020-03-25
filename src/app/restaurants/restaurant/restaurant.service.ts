import { Restaurant } from "./restaurant.model";
import { Injectable} from "@angular/core";
import { Http } from "@angular/http";
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs/Observable";

import {ErrorHandler} from "app/app.erro-handler"

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()

export class RestaurantService {


  constructor(private http: Http) { }

  restaurants(): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants1`)      
      .map(response => response.json())
      .catch(ErrorHandler.handlerError)
  }
}