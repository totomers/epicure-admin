import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefTableComponent } from './components/chef/chef-table/chef-table.component';
import { DishTableComponent } from './components/dish/dish-table/dish-table.component';
import { OverviewsComponent } from './components/home/overviews/overviews.component';
import { RestaurantTableComponent } from './components/restaurant/restaurant-table/restaurant-table.component';
import { EditorComponent } from './editor.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: EditorComponent,
    children: [
      {
        path: '',
        component: OverviewsComponent,
        data: { animation: 'overview' },
      },
      {
        path: 'restaurants',
        component: RestaurantTableComponent,
        data: { animation: 'restaurants' },
      },
      {
        path: 'chefs',
        component: ChefTableComponent,
        data: { animation: 'chefs' },
      },
      {
        path: 'dishes',
        component: DishTableComponent,
        data: { animation: 'dishes' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
