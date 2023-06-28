import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent{

  @Input() tableDetails:any;
  @Output() eventCardEvent = new EventEmitter<string>();

  showEventCard(id:string) {
    console.log(id)
    this.eventCardEvent.emit(id);
  }
}
