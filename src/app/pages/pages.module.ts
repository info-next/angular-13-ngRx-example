import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
