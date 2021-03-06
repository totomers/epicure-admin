import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRestaurant } from '../interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private _restaurants = new BehaviorSubject<IRestaurant[] | null>(null);
  private _restaurants$ = this._restaurants.asObservable();

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this._restaurants$;
  }

  isEmpty() {
    return this._restaurants.getValue() === null;
  }

  _getRestaurantsRawValue() {
    return this._restaurants.getValue();
  }

  setRestaurants(restaurants: IRestaurant[]) {
    return this._restaurants.next(restaurants);
  }

  async getAllRestaurantsFromServer() {
    try {
      const restaurants = await firstValueFrom(
        this.http.get<{ restaurants: IRestaurant[] }>(
          `${environment.apiUrl}/restaurants/getAll`
        )
      );

      this.setRestaurants(restaurants.restaurants);
    } catch (error) {
      console.log(error);
    }
  }

  async updateRestaurantServer(
    _id: string,
    update: {
      name: string;
      url: string;
      chef: string;
      isPopular: boolean;
      signatureDish: string;
    }
  ) {
    try {
      const { updatedRestaurant } = await firstValueFrom(
        this.http.put<{ updatedRestaurant: IRestaurant }>(
          `${environment.apiUrl}/restaurants/update/${_id}`,
          update
        )
      );
      this._updateRestaurantLocally(updatedRestaurant);
    } catch (error) {
      console.log(error);
    }
  }
  async createRestaurantServer(restaurant: {
    name: string;
    url: string;
    chef: string;
    isPopular: boolean;
    signatureDish: string;
  }) {
    try {
      const { newRestaurant } = await firstValueFrom(
        this.http.post<{ newRestaurant: IRestaurant }>(
          `${environment.apiUrl}/restaurants/create`,
          restaurant
        )
      );
      this._createRestaurantLocally(newRestaurant);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRestaurantServer(_id: string) {
    try {
      const { deleted } = await firstValueFrom(
        this.http.delete<{ deleted: boolean }>(
          `${environment.apiUrl}/restaurants/${_id}`
        )
      );
      if (deleted) this._deleteRestaurantLocally(_id);
    } catch (error) {
      console.log(error);
    }
  }

  _updateRestaurantLocally(updatedRestaurant: IRestaurant) {
    const currentRestaurants = this._getRestaurantsRawValue()!;
    const curIndex = currentRestaurants?.findIndex(
      (r) => r._id === updatedRestaurant._id
    );
    currentRestaurants[curIndex] = updatedRestaurant;
    this.setRestaurants(currentRestaurants);
  }
  _createRestaurantLocally(createRestaurant: IRestaurant) {
    const currentRestaurants = this._getRestaurantsRawValue()!;
    currentRestaurants.push(createRestaurant);
    this.setRestaurants(currentRestaurants);
  }

  _deleteRestaurantLocally(_id: string) {
    const currentRestaurants = this._getRestaurantsRawValue()!;
    const curIndex = currentRestaurants?.findIndex((r) => r._id === _id);
    currentRestaurants.splice(curIndex, 1);
    this.setRestaurants(currentRestaurants);
  }
}
