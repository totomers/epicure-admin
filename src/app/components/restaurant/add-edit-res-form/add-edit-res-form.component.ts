import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IChef } from 'src/app/interfaces/chef.interface';
import { IDish } from 'src/app/interfaces/dish.interface';
import { IRestaurant } from 'src/app/interfaces/restaurant.interface';
import { ChefService } from 'src/app/services/chef.service';
import { DishService } from 'src/app/services/dish.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';
export interface DialogRestaurantData {
  restaurant: IRestaurant | null;
}

@Component({
  selector: 'app-add-edit-res-form',
  templateUrl: './add-edit-res-form.component.html',
  styleUrls: ['./add-edit-res-form.component.scss'],
})
export class AddEditResFormComponent implements OnInit {
  restaurant: IRestaurant | null;
  form: FormGroup;
  chefs: Observable<IChef[] | null>;
  dishesOfRestaurant: IDish[] | null;
  serverUrl = environment.serverUrl;
  currentImageUrl: string | undefined;
  defaultImage =
    'https://www.ramw.org/sites/default/files/styles/content/public/default_images/default-news.jpg?itok=jsMUP47r';
  constructor(
    private fb: FormBuilder,
    private chefService: ChefService,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<AddEditResFormComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogRestaurantData
  ) {}

  ngOnInit(): void {
    this.restaurant = this.data.restaurant;

    this.chefService.getChefsFromServer();
    this.chefs = this.chefService.getChefs();
    if (this.data.restaurant?._id)
      this.dishService
        .getAllDishesOfRestaurant(this.data.restaurant._id)
        .then((dishes) => (this.dishesOfRestaurant = dishes));
    this.currentImageUrl = this.data.restaurant?.url || this.defaultImage;
    this.form = this.fb.group({
      //get chefs from chef service and then give option value the _id of chef and give the chidl of option the chef name
      name: [
        this.restaurant?.name || '',
        [Validators.min(1), Validators.max(20), Validators.required],
      ],
      chef: [this.restaurant?.chef._id || '', [Validators.required]],
      isPopular: [this.restaurant?.isPopular || false],
      signatureDish: [this.restaurant?.signatureDish?._id || ''],
      url: [this.restaurant?.url || ''],
    });
  }

  get fc() {
    return this.form.controls;
  }

  updateRestaurant() {
    const restaurantId = this.data.restaurant?._id!;
    const updates = this.form.getRawValue();
    this.restaurantService.updateRestaurantServer(restaurantId, updates);
    this.dialogRef.close('Updated Restaurant Succesfully');
  }
  createRestaurant() {
    const restaurant = this.form.getRawValue();
    this.restaurantService.createRestaurantServer(restaurant);
    this.dialogRef.close('Created Restaurant Succesfully');
  }

  async uploadFile(e: any) {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      const imageUrl = await this.uploadService.uploadImage(file);
      //@ts-ignore
      this.currentImageUrl = imageUrl;
      this.fc['url'].setValue(imageUrl);
    } catch (error) {
      console.log(`error`, error);
    }
  }
  // pasteClipboardText = (e: any) => {
  //   e.preventDefault();
  //   navigator.clipboard
  //     .readText()
  //     .then((text) => {
  //       console.log(`text`, text);
  //       this.fc['url'].setValue(text);
  //     })
  //     .catch((err) => {
  //       // maybe user didn't grant access to read from clipboard
  //       console.log('Something went wrong', err);
  //     });
  // };
  // eraseCurrentUrl(e: any) {
  //   e.preventDefault();
  //   this.fc['url'].setValue('');
  // }
  // handleUrlError(e: any) {
  //   console.log(`e`, e);
  //   this.fc['url'].setValue('');
  // }
}
