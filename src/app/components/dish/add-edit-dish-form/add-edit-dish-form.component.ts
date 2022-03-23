import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IDish } from 'src/app/interfaces/dish.interface';
import { IRestaurant } from 'src/app/interfaces/restaurant.interface';
import { DishService } from 'src/app/services/dish.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-dish-form',
  templateUrl: './add-edit-dish-form.component.html',
  styleUrls: ['./add-edit-dish-form.component.scss'],
})
export class AddEditDishFormComponent implements OnInit {
  dish: IDish | null;
  restaurants$: Observable<IRestaurant[] | null>;
  form: FormGroup;
  serverUrl = environment.serverUrl;
  currentImageUrl: string | undefined;
  defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDABIoRO5-h4YHNTKnKcTX_876LpIoX_opOEg-elD5aPAKMFEPoK7CcmscZH696lE4z8&usqp=CAU';
  tags = ['spicy', 'vegan', 'vegetarian'];
  dishTags: { label: string; url: string }[] = [];
  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<AddEditDishFormComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { dish: IDish | null }
  ) {}

  ngOnInit(): void {
    this.dish = this.data.dish;

    this.restaurants$ = this.restaurantService.getRestaurants();

    if (this.restaurantService.isEmpty()) {
      this.restaurantService.getAllRestaurantsFromServer();
    }

    this.currentImageUrl = this.data.dish?.url || this.defaultImage;
    this.form = this.fb.group({
      name: [
        this.dish?.name || '',
        [Validators.min(1), Validators.max(20), Validators.required],
      ],
      url: [this.dish?.url || ''],
      ingredients: [this.dish?.ingredients || '', [Validators.required]],
      restaurant: [this.dish?.restaurant._id || null, [Validators.required]],
      price: [
        this.dish?.price || 0,
        [Validators.min(0), Validators.max(1000), Validators.required],
      ],
      tags: [this.dish?.tags || []],
    });
  }

  get fc() {
    return this.form.controls;
  }

  updateDish() {
    const dishId = this.data.dish?._id!;
    const updates = this.form.getRawValue();
    this.dishService.updateDishServer(dishId, updates);
    this.dialogRef.close('Updated Dish Succesfully');
  }

  createDish() {
    const dish = this.form.getRawValue();
    this.dishService.createDishServer(dish);
    this.dialogRef.close('Created dish Succesfully');
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

  // mapTag(label: string) {
  //   switch (label) {
  //     case 'spicy':
  //       return { label, url: '/assets/icons/spicy-icon.svg' };
  //     case 'vegan':
  //       return { label, url: '/assets/icons/vegan-icon.svg' };
  //     case 'vegetarian':
  //       return { label, url: '/assets/icons/vegetarian-icon.svg' };
  //     default:
  //       return { label, url: '' };
  //   }
  // }
}
