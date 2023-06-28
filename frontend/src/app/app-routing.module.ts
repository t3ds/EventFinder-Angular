import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  {path:'', redirectTo: 'search',pathMatch: 'full'},
  {path:'search',component:SearchComponent},
  {path:'favourites',component:FavouritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
