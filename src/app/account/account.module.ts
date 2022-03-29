import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from 'src/material.module';

@NgModule({
  declarations: [AccountComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
