import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefTableComponent } from './components/chef/chef-table/chef-table.component';
import { DishTableComponent } from './components/dish/dish-table/dish-table.component';
import { OverviewsComponent } from './components/home/overviews/overviews.component';
import { RestaurantTableComponent } from './components/restaurant/restaurant-table/restaurant-table.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: OverviewsComponent,
  },
  {
    path: 'restaurants',
    component: RestaurantTableComponent,
  },
  {
    path: 'chefs',
    component: ChefTableComponent,
  },
  {
    path: 'dishes',
    component: DishTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
