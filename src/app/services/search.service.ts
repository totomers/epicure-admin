import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  async getCollectionCount() {
    try {
      const count = await firstValueFrom(
        this.http.get<{ restaurants: number; dishes: number; chefs: number }>(
          `${environment.apiUrl}/search/count`
        )
      );
      console.log('count received from server:', count);
      return count;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
