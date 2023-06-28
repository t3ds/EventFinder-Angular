import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite-table',
  templateUrl: './favourite-table.component.html',
  styleUrls: ['./favourite-table.component.css']
})

export class FavouriteTableComponent implements OnInit{
  
  events:any = [];
  txt:string = "favourite events"

  ngOnInit(): void {
    for(let i=0;i<localStorage.length;i++){

      if(localStorage?.key(i)){
        //console.log(localStorage.getItem(localStorage.key(i)!))
        this.events.push(JSON.parse(localStorage.getItem(localStorage.key(i)!)!))
      }
    }
    console.log(this.events)
  }

  /*for(let i=0; i<localStorage.length;i++){
    this.events[i] = localStorage.getItem(localStorage.key(i))
  }*/

  UpdateFavs(i:any){
    localStorage.removeItem(localStorage.key(i)!)
    this.events.splice(i,1)
    alert("Removed From Favourites!")
    console.log(this.events)
  }
}
