import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IChef } from 'src/app/interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';
import { AddEditChefFormComponent } from './add-edit-chef-form/add-edit-chef-form.component';

@Component({
  selector: 'app-chef-table',
  templateUrl: './chef-table.component.html',
  styleUrls: ['./chef-table.component.scss'],
})
export class ChefTableComponent implements OnInit {
  restaurants$: Observable<IChef[] | null>;
  listData: MatTableDataSource<any>;
  searchKey = '';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chefService: ChefService, public dialog: MatDialog) {}
  columnsToDisplay = ['name', 'isWeekly', 'descr', 'actions'];
  ngOnInit(): void {
    this.chefService.getChefsFromServer();
    this.chefService.getChefs().subscribe((chefs) => {
      this.listData = new MatTableDataSource(chefs!);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  openEditDialog(chef: IChef) {
    this.dialog.open(AddEditChefFormComponent, {
      data: {
        chef: chef,
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
