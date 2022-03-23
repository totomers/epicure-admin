import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IDish } from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';
import { AddEditDishFormComponent } from '../add-edit-dish-form/add-edit-dish-form.component';

@Component({
  selector: 'app-dish-table',
  templateUrl: './dish-table.component.html',
  styleUrls: ['./dish-table.component.scss'],
})
export class DishTableComponent implements OnInit {
  dishes$: Observable<IDish[] | null>;
  listData: MatTableDataSource<any>;
  searchKey = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dishService: DishService, public dialog: MatDialog) {}
  columnsToDisplay = [
    'name',
    'restaurant',
    'ingredients',
    'tags',
    'price',
    'actions',
  ];
  ngOnInit(): void {
    this.dishService.getAllDishesFromServer();
    this.dishService.getDishes().subscribe((dishes) => {
      this.listData = new MatTableDataSource(dishes!);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  getTagIcon(tag: 'spicy' | 'vegetarian' | 'vegan' | null) {
    switch (tag) {
      case 'spicy':
        return '/assets/icons/spicy-icon.svg';
      case 'vegan':
        return '/assets/icons/vegan-icon.svg';
      case 'vegetarian':
        return '/assets/icons/vegetarian-icon.svg';

      default:
        return '';
    }
  }

  openEditDialog(dish: IDish) {
    this.dialog.open(AddEditDishFormComponent, {
      data: {
        dish: dish,
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
}
