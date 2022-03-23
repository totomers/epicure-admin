import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IDish } from 'src/app/interfaces/dish.interface';
import { IRestaurant } from 'src/app/interfaces/restaurant.interface';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-res-dish-list',
  templateUrl: './res-dish-list.component.html',
  styleUrls: ['./res-dish-list.component.scss'],
})
export class ResDishListComponent implements OnInit {
  dishes: IDish[] | null;
  loading = true;
  constructor(
    private dishService: DishService,
    public dialogRef: MatDialogRef<ResDishListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { restaurant: IRestaurant | null }
  ) {}

  ngOnInit(): void {
    if (this.data.restaurant?._id)
      this.dishService
        .getAllDishesOfRestaurant(this.data.restaurant._id)
        .then((dishes) => {
          if (dishes && dishes.length > 0) this.dishes = dishes;
        })
        .finally(() => (this.loading = false));
  }
  delete() {}

  makeSignature() {}
}
