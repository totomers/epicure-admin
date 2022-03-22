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

  constructor(private http: HttpClient) {}

  getChefs() {
    return this._chefs$;
  }

  setChefs(chefs: IChef[]) {
    this._chefs.next(chefs);
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
}
