import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  async uploadImage(base64EncodedImage: string) {
    try {
      const formData = new FormData();
      console.log('base64encodedImage:', base64EncodedImage);

      formData.append('image', base64EncodedImage);
      console.log('formData', formData.get('image'));

      const url = await firstValueFrom(
        this.http.post<{ url: string }>(
          `${environment.apiUrl}/uploads`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
      );
      console.log('url from server', url);
      return url.url;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
