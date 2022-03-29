import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddEditResFormComponent } from './components/restaurant/add-edit-res-form/add-edit-res-form.component';
import { RestaurantTableComponent } from './components/restaurant/restaurant-table/restaurant-table.component';
import { ChefTableComponent } from './components/chef/chef-table/chef-table.component';
import { DishTableComponent } from './components/dish/dish-table/dish-table.component';
import { AddEditChefFormComponent } from './components/chef/add-edit-chef-form/add-edit-chef-form.component';
import { AddEditDishFormComponent } from './components/dish/add-edit-dish-form/add-edit-dish-form.component';
import { ResDishListComponent } from './components/restaurant/res-dish-list/res-dish-list.component';
import { OverviewsComponent } from './components/home/overviews/overviews.component';
import { EditorComponent } from './editor.component';
import { MatSliderModule } from '@angular/material/slider';
import { MaterialComponentsModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    RestaurantTableComponent,
    AddEditResFormComponent,
    ChefTableComponent,
    DishTableComponent,
    AddEditChefFormComponent,
    AddEditDishFormComponent,
    ResDishListComponent,
    OverviewsComponent,
    EditorComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatSliderModule,
    MaterialComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditorModule {}
