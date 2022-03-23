import { IRestaurant } from './restaurant.interface';

export interface IChef {
  _id: string;
  name: string;
  descr: string;
  url: string;
  isWeekly: boolean;
  url2x?: string;
  url3x?: string;
}
