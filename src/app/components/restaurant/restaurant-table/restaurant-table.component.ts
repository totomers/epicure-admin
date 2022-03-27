import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IRestaurant } from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { slideInAnimation } from 'src/app/utils/animations';
import { AddEditResFormComponent } from '../add-edit-res-form/add-edit-res-form.component';
import { ResDishListComponent } from '../res-dish-list/res-dish-list.component';

@Component({
  selector: 'app-restaurant-table',
  animations: slideInAnimation,
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.scss'],
})
export class RestaurantTableComponent implements OnInit, AfterViewInit {
  restaurants$: Observable<IRestaurant[] | null>;
  isShown = false;
  listData: MatTableDataSource<any>;
  searchKey = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private restaurantService: RestaurantService,
    public dialog: MatDialog
  ) {}
  columnsToDisplay = [
    'name',
    'chef',
    'isPopular',
    'signatureDish',
    'dishes',
    'actions',
  ];
  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.listData = new MatTableDataSource(restaurants!);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    this.restaurantService.getAllRestaurantsFromServer();
  }

  ngAfterViewInit(): void {
    this.isShown = true;
  }

  openEditDialog(restaurant: IRestaurant | null) {
    this.dialog.open(AddEditResFormComponent, {
      data: {
        restaurant: restaurant,
      },
    });
  }
  openDishesDialog(restaurant: IRestaurant | null) {
    this.dialog.open(ResDishListComponent, {
      data: {
        restaurant: restaurant,
      },
    });
  }
  clearSearch() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  deleteRestaurant(_id: string) {
    this.restaurantService.deleteRestaurantServer(_id);
  }
}
