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
}
