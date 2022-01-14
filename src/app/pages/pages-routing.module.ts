import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { UpdateProgramComponent } from './update-program/update-program.component';

const routes: Routes = [

   {
    path: '',
    component: ListComponent,
   },
   {
    path: 'home',
    component: HomeComponent,
   },
   {
    path: 'update',
    component: UpdateProgramComponent,
   }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
