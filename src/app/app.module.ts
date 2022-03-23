import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialComponentsModule } from '../material.module';
import { RestaurantTableComponent } from './components/restaurant/restaurant-table/restaurant-table.component';
import { AddEditResFormComponent } from './components/restaurant/add-edit-res-form/add-edit-res-form.component';
import { ChefTableComponent } from './components/chef/chef-table/chef-table.component';
import { DishTableComponent } from './components/dish/dish-table/dish-table.component';
import { AddEditChefFormComponent } from './components/chef/chef-table/add-edit-chef-form/add-edit-chef-form.component';
import { AddEditDishFormComponent } from './components/dish/add-edit-dish-form/add-edit-dish-form.component';
import { ResDishListComponent } from './components/restaurant/res-dish-list/res-dish-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    RestaurantTableComponent,
    AddEditResFormComponent,
    ChefTableComponent,
    DishTableComponent,
    AddEditChefFormComponent,
    AddEditDishFormComponent,
    ResDishListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MaterialComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
