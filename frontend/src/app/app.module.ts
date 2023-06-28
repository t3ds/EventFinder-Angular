import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { SearchComponent } from './search/search.component';
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResultTableComponent } from './result-table/result-table.component';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { MatTabsModule } from '@angular/material/tabs'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GmapCardComponent } from './gmap-card/gmap-card.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { FavouritesComponent } from './favourites/favourites.component';
import { FavouriteTableComponent } from './favourites/favourite-table/favourite-table.component';
import { DefaultComponentComponent } from './default-component/default-component.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    SearchComponent,
    SearchBoxComponent,
    ResultTableComponent,
    DetailCardComponent,
    GmapCardComponent,
    FavouritesComponent,
    FavouriteTableComponent,
    DefaultComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
