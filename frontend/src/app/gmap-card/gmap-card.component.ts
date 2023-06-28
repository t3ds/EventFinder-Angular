import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewEncapsulation } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-gmap-card',
  templateUrl: './gmap-card.component.html',
  styleUrls: ['./gmap-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GmapCardComponent {
  constructor(
    public dialogRef: MatDialogRef<GmapCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  mapOptions: google.maps.MapOptions = {
    center: {lat: this.data.lat, lng: this.data.lng},
    zoom : 14
 }


  onNoClick(): void{
    this.dialogRef.close();
  }
}
