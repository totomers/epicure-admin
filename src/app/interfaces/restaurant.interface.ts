import { IChef } from './chef.interface';
import { IDish } from './dish.interface';

export interface IRestaurant {
  url: string;
  _id: string;
  name: string;
  chef: IChef;
  isPopular: boolean;
  signatureDish: IDish;
  url2x?: string;
  url3x?: string;
}
