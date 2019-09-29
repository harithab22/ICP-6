// @ts-ignore
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchRestaurantComponent} from './search-restaurant/search-restaurant.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/search-restaurant', pathMatch: 'full' },
  { path: 'search-restaurant', component: SearchRestaurantComponent}
];

@NgModule({
  "imports": [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
