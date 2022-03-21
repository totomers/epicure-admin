import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRestaurant } from '../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private _restaurants = new BehaviorSubject<IRestaurant[]>([]);
  private _restaurants$ = this._restaurants.asObservable();

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this._restaurants$;
  }

  setRestaurants(restaurants: IRestaurant[]) {
    return this._restaurants.next(restaurants);
  }

  async getAllRestaurantsFromServer() {
    try {
      const restaurants = await firstValueFrom(
        this.http.get<{ restaurants: IRestaurant[] }>(
          `${environment.apiUrl}/restaurants`
        )
      );
      console.log('restaurants received from server:', restaurants);

      this.setRestaurants(restaurants.restaurants);
    } catch (error) {
      console.log(error);
    }
  }
}
