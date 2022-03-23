import { IRestaurant } from './restaurant.interface';

export interface IDish {
  _id: string;
  name: string;
  ingredients: string;
  url: string;
  restaurant: IRestaurant;
  price: number;
  tags?: string[];
  url2x?: string;
  url3x?: string;
}
