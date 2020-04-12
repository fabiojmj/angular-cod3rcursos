import { NgModule } from "@angular/core";
import { ShoppingService } from "app/restaurant-detail/shopping/shopping.service";
import { RestaurantService } from "app/restaurants/restaurant/restaurant.service";
import { OrderService } from "app/order/order.service";

@NgModule({
    providers:[ShoppingService,RestaurantService,OrderService]
})
export class CoreModule{

}