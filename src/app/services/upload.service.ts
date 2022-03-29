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
      // const formData = new FormData();
      // console.log('base64encodedImage:', base64EncodedImage);

      // formData.append('image', base64EncodedImage);
      // // console.log('formData', formData.get('image'));

      const { url } = await firstValueFrom(
        this.http.get<{ url: string }>(`${environment.apiUrl}/s3`)
      );
      console.log('file', base64EncodedImage);

      console.log('url from server', url);

      const response = await firstValueFrom(
        this.http.put(url, base64EncodedImage)
      );

      const imageUrl = url.split('?')[0];
      console.log('imageUrl', imageUrl);

      return imageUrl;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
