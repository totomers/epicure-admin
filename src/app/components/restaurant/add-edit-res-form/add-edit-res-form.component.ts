import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IChef } from 'src/app/interfaces/chef.interface';
import { IRestaurant } from 'src/app/interfaces/restaurant.interface';
import { ChefService } from 'src/app/services/chef.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';
export interface DialogRestaurantData {
  restaurant: IRestaurant;
}

@Component({
  selector: 'app-add-edit-res-form',
  templateUrl: './add-edit-res-form.component.html',
  styleUrls: ['./add-edit-res-form.component.scss'],
})
export class AddEditResFormComponent implements OnInit {
  restaurant: IRestaurant;
  form: FormGroup;
  chefs: Observable<IChef[] | null>;
  serverUrl = environment.serverUrl;
  defaultImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADPCAMAAABlX3VtAAAAMFBMVEX19fXDvrjQzMfc2tfp5+bGwbzy8vHs6+rMyMPW08/JxcDv7u3i4N7Tz8vf3drZ1tPsNjAMAAAD8UlEQVR4nO2c25KrIBBFIwpGvP3/354RAcPVGBv1VO31ZjkqS5sWaTKvFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCDqCsa3u3dJgv9m0jnj+lumder4XQ6VTWKm3VmSps/5K0x1+pYY/V5Zv2g6/t0BtIm2JtzU8yJbr0+b556wkO0kr4Lm+Qy053yWybdgWlTrEn+7570tLuIsVQ6mu+IORMXJV4X5tzddWlBD3D4UOTsgumYu+hVVP56Ze+Xh81BBeOhKZA7E1zTX8vlG5fr8mmZ94EH7QAnT/nhz8XjkdKXu368WDQcTEBfOZ63t5C8u5qEU0l2KVWhmNOxfB/ET4jtX7EsxA/odp8Cz4df23UsavBDq6N8GPE5v6WGzy7woQM++8CHDvjsAx+F6EjLQxqCmaUffahKkR78Lp9Sw1j4EPo8cbR9xuf0xR1osh187GHwyQKfGPCxh8EnC3xipHzE0K1jgG6IlR1yPoKlSxVdek1FSZ/emdYewznZnM8yw9/Fd6laRqIaXM5HBIvFgjUDOZ9MCKs2JwozxXzayMJEv36b81kGlu9Mmy/2ac2Xp2R1PRo33gaHJUoDoko3TLV5jO8by/iIVYfPeuK/r3lEiKVvdFOlXVW3THyE8vRjPUDgsz6Q8aOMoUt4UniHVTJ6xjWVRBOCvldRV3Ubzq8n832mWGuGyr8YSzas1wEaq+voWYdosshE8BE8n/UOBjd38pvIwkemMfXYSC/pTc+MNHtKP/BDeD7qtJEoHj1NPX8QRpWplsdeMzZv8mBeak1CBOuUPB+ZuH2915HNfIgvtEamjAmJj3e0P9G26pzPBr5PmwzvzhW18zvuSqn1RfzuZdDhvOX2bp1er6+gWKPk+qTHIyr91M5humW1NRqkiSb9DpP2VCbrb4y29Q1LBehpH5WA4hVn98mpJugm8nFqmmYyM8Cqc5iXMu+WfbUzXWfi7j0Py2F6SRyNjueTGca8wz+M/mJD9/U2Nr/NVDzGJ4uJ1iyGPomhZEw8HLhuXwqCBftqM0YzyxQ3yNZ4nvLZYl8jP7t54z6+rt/GnMLtTpJuQelJn7+ePptmy85P9K3dxybVK7cxtBhGnjrsVp+FZiHxSbrsshnG/SYoX8/60edr4HMU+Ngt+MDnMPCxW/CBz2HgY7fgA5/DwMduwQc+h4GP3YLPw32aw3SP9vkR+JT3OfGzyK0q9iCfaPngO7a56gf5vMTxZLDyUV16kg8F8NkHPnTAZx/40AGffZZmSvu/9KSz5ZDZ9Ss/fnTs+twKfLKM+1f8r3xODJRJuORfjQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACk+QdvISUvRNWLXgAAAABJRU5ErkJggg==';
  constructor(
    private fb: FormBuilder,
    private chefService: ChefService,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<AddEditResFormComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogRestaurantData
  ) {}

  ngOnInit(): void {
    this.restaurant = this.data.restaurant;

    this.chefService.getChefsFromServer();
    this.chefs = this.chefService.getChefs();
    this.form = this.fb.group({
      //get chefs from chef service and then give option value the _id of chef and give the chidl of option the chef name
      name: [
        this.restaurant.name || '',
        [Validators.min(1), Validators.max(20), Validators.required],
      ],
      chef: [this.restaurant.chef._id || '', [Validators.required]],
      isPopular: [this.restaurant.isPopular || false],
      signatureDish: [this.restaurant.signatureDish || ''],
      url: [this.restaurant.url || ''],
    });
  }

  get fc() {
    return this.form.controls;
  }

  updateRestaurant() {}
  createRestaurant() {}

  convertFileToBase64EncodedFile(e: any) {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const fileUrl = reader.result as string;

        const imageUrl = await this.uploadService.uploadImage(fileUrl);
        console.log('imageUrl from server', imageUrl);
        this.fc['url'].setValue(fileUrl); //this url is a base64encoded file
      };
    } catch (error) {
      console.log(`error`, error);
    }
  }
  pasteClipboardText = (e: any) => {
    e.preventDefault();
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log(`text`, text);
        this.fc['url'].setValue(text);
      })
      .catch((err) => {
        // maybe user didn't grant access to read from clipboard
        console.log('Something went wrong', err);
      });
  };
  eraseCurrentUrl(e: any) {
    e.preventDefault();
    this.fc['url'].setValue('');
  }
  handleUrlError(e: any) {
    console.log(`e`, e);
    this.fc['url'].setValue('');
  }
}
