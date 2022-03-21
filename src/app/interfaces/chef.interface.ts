import { IRestaurant } from "./restaurant.interface";

export interface IChef {
  _id: string;
  name: string;
  descr: string;
  url: string;
  restaurants: IRestaurant[];
  url2x?: string;
  url3x?: string;
}
