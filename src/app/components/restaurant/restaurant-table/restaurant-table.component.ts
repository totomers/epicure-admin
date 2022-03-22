import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IRestaurant } from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { AddEditResFormComponent } from '../add-edit-res-form/add-edit-res-form.component';

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.scss'],
})
export class RestaurantTableComponent implements OnInit {
  restaurants$: Observable<IRestaurant[] | null>;
  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog
  ) {}
  columnsToDisplay = ['name', 'chef', 'isPopular', 'actions'];
  ngOnInit(): void {
    this.restaurantService.getAllRestaurantsFromServer();
    this.restaurants$ = this.restaurantService.getRestaurants();
  }

  openEditDialog(restaurant: IRestaurant) {
    this.dialog.open(AddEditResFormComponent, {
      data: {
        restaurant: restaurant,
      },
    });
  }
}
