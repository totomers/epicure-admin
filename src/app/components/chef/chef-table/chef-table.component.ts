import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { IChef } from 'src/app/interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';
import { slideInAnimation } from 'src/app/utils/animations';
import { AddEditChefFormComponent } from '../add-edit-chef-form/add-edit-chef-form.component';

@Component({
  selector: 'app-chef-table',
  animations: slideInAnimation,
  templateUrl: './chef-table.component.html',
  styleUrls: ['./chef-table.component.scss'],
})
export class ChefTableComponent implements OnInit, AfterViewInit {
  chefs: IChef[] | null;
  listData: MatTableDataSource<any>;
  searchKey = '';
  isShown = false;
  disableSelect = new FormControl(false);
  weeklyChef$: Observable<IChef | null>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chefService: ChefService, public dialog: MatDialog) {}
  columnsToDisplay = ['name', 'descr', 'actions'];
  ngOnInit(): void {
    this.chefService.getChefs().subscribe((chefs) => {
      this.chefs = chefs;
      this.listData = new MatTableDataSource(chefs!);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    this.weeklyChef$ = this.chefService.getWeeklyChef();

    this.chefService.getChefsFromServer();
    this.chefService.getWeeklyChefServer();
  }
  ngAfterViewInit(): void {
    this.isShown = true;
  }

  updateWeeklyChef($event?: any) {
    console.log($event.value);
    const chefId = $event.value;
    this.chefService.updateWeeklyChefServer(chefId);
  }

  deleteChef(_id: string) {
    this.chefService.deleteChefServer(_id);
  }

  openEditDialog(chef: IChef | null) {
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
