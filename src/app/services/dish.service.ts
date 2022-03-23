import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDish } from '../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private _dishes = new BehaviorSubject<IDish[] | null>(null);
  private _dishes$ = this._dishes.asObservable();

  constructor(private http: HttpClient) {}

  getDishes() {
    return this._dishes$;
  }

  _getDishesRawValue() {
    return this._dishes.getValue();
  }
  setDishes(dishes: IDish[]) {
    return this._dishes.next(dishes);
  }

  async getAllDishesFromServer() {
    try {
      const dishes = await firstValueFrom(
        this.http.get<{ dishes: IDish[] }>(`${environment.apiUrl}/dishes`)
      );
      console.log('dishes received from server:', dishes.dishes);

      this.setDishes(dishes.dishes);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllDishesOfRestaurant(_id: string) {
    try {
      const dishes = await firstValueFrom(
        this.http.get<{ dishes: IDish[] }>(
          `${environment.apiUrl}/dishes/ofRestaurant/${_id}`
        )
      );
      console.log('dishes received from server:', dishes.dishes);

      return dishes.dishes;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDishServer(
    _id: string,
    update: {
      name: string;
      url: string;
      ingredients: string;
      restaurant: string;
      price: number;
      tags: string[];
    }
  ) {
    try {
      const { updatedDish } = await firstValueFrom(
        this.http.put<{ updatedDish: IDish }>(
          `${environment.apiUrl}/dishes/update/${_id}`,
          update
        )
      );
      console.log('updatedDish received from server:', updatedDish);
      this._updateDishLocally(updatedDish);
    } catch (error) {
      console.log(error);
    }
  }
  async createDishServer(dish: {
    name: string;
    url: string;
    ingredients: string;
    restaurant: string;
    price: number;
    tags: string[];
  }) {
    try {
      const { newDish } = await firstValueFrom(
        this.http.post<{ newDish: IDish }>(
          `${environment.apiUrl}/dishes/create`,
          dish
        )
      );
      console.log('newDish received from server:', newDish);
      this._createDishLocally(newDish);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDishServer(_id: string) {
    try {
      const { deleted } = await firstValueFrom(
        this.http.delete<{ deleted: boolean }>(
          `${environment.apiUrl}/dishes/${_id}`
        )
      );
      console.log('Dish deleted from server:', deleted);
      if (deleted) this._deleteDishLocally(_id);
    } catch (error) {
      console.log(error);
    }
  }

  _updateDishLocally(updatedDish: IDish) {
    const currentDishes = this._getDishesRawValue()!;
    const curIndex = currentDishes?.findIndex((r) => r._id === updatedDish._id);
    currentDishes[curIndex] = updatedDish;
    this.setDishes(currentDishes);
  }
  _createDishLocally(createdDish: IDish) {
    const currentDishes = this._getDishesRawValue()!;
    currentDishes.push(createdDish);
    this.setDishes(currentDishes);
  }

  _deleteDishLocally(_id: string) {
    const currentDishes = this._getDishesRawValue()!;
    const curIndex = currentDishes?.findIndex((r) => r._id === _id);
    currentDishes.splice(curIndex, 1);
    this.setDishes(currentDishes);
  }
}
