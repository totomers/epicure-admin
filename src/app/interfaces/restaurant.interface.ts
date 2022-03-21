import { IChef } from "./chef.interface";
import { IDish } from "./dish.interface";

export interface IRestaurant {
  url: string;
  _id: string;
  name: string;
  chef: IChef;
  signatureDish: IDish;
  url2x?: string;
  url3x?: string;
}
