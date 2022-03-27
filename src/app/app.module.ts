import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialComponentsModule } from '../material.module';
import { RestaurantTableComponent } from './components/restaurant/restaurant-table/restaurant-table.component';
import { AddEditResFormComponent } from './components/restaurant/add-edit-res-form/add-edit-res-form.component';
import { ChefTableComponent } from './components/chef/chef-table/chef-table.component';
import { DishTableComponent } from './components/dish/dish-table/dish-table.component';
import { AddEditChefFormComponent } from './components/chef/add-edit-chef-form/add-edit-chef-form.component';
import { AddEditDishFormComponent } from './components/dish/add-edit-dish-form/add-edit-dish-form.component';
import { ResDishListComponent } from './components/restaurant/res-dish-list/res-dish-list.component';
import { MainComponent } from './components/main/main.component';
import { OverviewsComponent } from './components/home/overviews/overviews.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RestaurantTableComponent,
    AddEditResFormComponent,
    ChefTableComponent,
    DishTableComponent,
    AddEditChefFormComponent,
    AddEditDishFormComponent,
    ResDishListComponent,
    MainComponent,
    OverviewsComponent,
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
