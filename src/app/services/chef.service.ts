import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IChef } from '../interfaces/chef.interface';
@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private _chefs = new BehaviorSubject<IChef[] | null>(null);
  private _chefs$ = this._chefs.asObservable();

  private _weeklyChef = new BehaviorSubject<IChef | null>(null);
  private _weeklyChef$ = this._weeklyChef.asObservable();

  constructor(private http: HttpClient) {}

  getChefs() {
    return this._chefs$;
  }

  _getChefsRawValue() {
    return this._chefs.getValue();
  }

  setChefs(chefs: IChef[]) {
    this._chefs.next(chefs);
  }

  getWeeklyChef() {
    return this._weeklyChef$;
  }

  setWeeklyChef(chef: IChef) {
    this._weeklyChef.next(chef);
  }

  async getChefsFromServer() {
    try {
      const chefs = await firstValueFrom(
        this.http.get<{ chefs: IChef[] }>(`${environment.apiUrl}/chefs`)
      );
      console.log('chefs', chefs);

      this.setChefs(chefs.chefs);
    } catch (error) {
      console.log(error);
    }
  }

  async getWeeklyChefServer() {
    try {
      const { weeklyChef } = await firstValueFrom(
        this.http.get<{ weeklyChef: IChef }>(
          `${environment.apiUrl}/chefs/weekly`
        )
      );
      this.setWeeklyChef(weeklyChef);
    } catch (error) {
      console.log(error);
    }
  }

  async updateWeeklyChefServer(_id: string) {
    try {
      const { updatedChef } = await firstValueFrom(
        this.http.put<{ updatedChef: IChef }>(
          `${environment.apiUrl}/chefs/updateWeekly/${_id}`,
          {}
        )
      );
      console.log(updatedChef);

      this.setWeeklyChef(updatedChef);
    } catch (error) {
      console.log(error);
    }
  }

  async updateChefServer(
    _id: string,
    update: {
      name: string;
      url: string;
      descr: string;
      isWeekly: boolean;
    }
  ) {
    try {
      const { updatedChef } = await firstValueFrom(
        this.http.put<{ updatedChef: IChef }>(
          `${environment.apiUrl}/chefs/update/${_id}`,
          update
        )
      );
      console.log('updatedChef received from server:', updatedChef);
      this._updateChefLocally(updatedChef);
    } catch (error) {
      console.log(error);
    }
  }
  async createChefServer(chef: {
    name: string;
    url: string;
    descr: string;
    isWeekly: boolean;
  }) {
    try {
      const { newChef } = await firstValueFrom(
        this.http.post<{ newChef: IChef }>(
          `${environment.apiUrl}/chefs/create`,
          chef
        )
      );
      console.log('newChef received from server:', newChef);
      this._createChefLocally(newChef);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChefServer(_id: string) {
    try {
      const { deleted } = await firstValueFrom(
        this.http.delete<{ deleted: boolean }>(
          `${environment.apiUrl}/chefs/${_id}`
        )
      );
      console.log('chef deleted from server:', deleted);
      if (deleted) this._deleteChefLocally(_id);
    } catch (error) {
      console.log(error);
    }
  }

  _updateChefLocally(updatedChef: IChef) {
    const currentChefs = this._getChefsRawValue()!;
    const curIndex = currentChefs?.findIndex((r) => r._id === updatedChef._id);
    currentChefs[curIndex] = updatedChef;
    this.setChefs(currentChefs);
  }
  _createChefLocally(createChef: IChef) {
    const currentChefs = this._getChefsRawValue()!;
    currentChefs.push(createChef);
    this.setChefs(currentChefs);
  }

  _deleteChefLocally(_id: string) {
    const currentChefs = this._getChefsRawValue()!;
    const curIndex = currentChefs?.findIndex((r) => r._id === _id);
    currentChefs.splice(curIndex, 1);
    this.setChefs(currentChefs);
  }
}
