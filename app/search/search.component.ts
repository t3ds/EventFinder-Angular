import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from './app.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{

  constructor(private appservice: AppService){}

  searchTable ?: any;
  eventDetails ?: any;
  temp ?: any;
  def?: []
  displayTable:boolean = true;
  displayEvent: boolean = false;

  updateTableList(e: any): void {
    //this.temp = e
    this.searchTable = e;
    console.log(this.displayEvent)
    this.displayEvent = false;
    console.log(this.searchTable)
  }

  updateEventShow(id:any): void {
    //console.log(id)
    this.appservice.fetchEventDetails(id).subscribe(res =>{
      this.eventDetails = res['data']

      console.log("IN SEARCH COMPONENT")
      console.log(this.eventDetails)
    })
    this.displayTable = false;
    this.displayEvent = true;
  }

  updateClear(){
    this.displayTable = true;
    this.displayEvent = false;
    this.eventDetails = undefined;
    this.searchTable = undefined;
  }

  resetState(val:boolean): void{
    this.displayTable = true;
    this.displayEvent = false;
  }

  

}
