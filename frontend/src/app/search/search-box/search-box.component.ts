import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { eventsearch } from 'src/app/config/config';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit{
  latitude: any = '';
  longitude: any = '';
  locationInfo !: any;
  locFetched: boolean = false;
  showBox:boolean = true;
  isLoading: boolean = false;
  minLengthTerm: number = 2;
  suggestion: any = [];
  errorMsg!: string;
  autokey= new FormControl();
  dist!: string;

  
  @Output() tableFetchEvent = new EventEmitter<eventsearch>();
  @Output() clearEvent = new EventEmitter();


  constructor(private appservice: AppService,
    private http: HttpClient) {
  }
  
  eventFetch(value: eventsearch){
    this.tableFetchEvent.emit(value);
  }

  eventClear(){
    this.clearEvent.emit();
  }

  //eventform!:FormGroup;
  eventform: FormGroup = new FormGroup({
    keyword: new FormControl('', Validators.required),
    distance: new FormControl(''),
    category: new FormControl(''),
    location: new FormControl('', Validators.required),
    autoloc: new FormControl('')
  })

  ngOnInit(): void {
    this.initializeForm();

    console.log(this.autokey.value);
    this.autokey.valueChanges
    .pipe(
      filter(
        res => {
          if (res == null||res.length <this.minLengthTerm || this.autokey.value == ""){
            console.log("AAA")
            this.suggestion = []
            return false
          }

          else{
            console.log("AAA")
            return res!=null && res.length>=this.minLengthTerm
    
          }
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg="";
          this.suggestion = [];
          this.isLoading = true;
        }),

        switchMap(value => this.http.get(`#BACKEND?keyword=${value}`)
        //switchMap(value => this.http.get(`http://localhost:5000/suggestions?keyword=${value}`)
        //switchMap(value => this.http.get(`https://localhost:5000/suggestions`, {params: {keyword:value}})
        .pipe(
          finalize(() =>{
          this.isLoading = false;
        }),
        )
      )
    )
    .subscribe((data:any) => {
      console.log("here")
      if (!data['data'].hasOwnProperty('_embedded')){
        
        this.errorMsg = "No Suggestions Found";
        this.suggestion = [];
      }
      else{
        console.log(data)
        this.errorMsg = "";
        this.suggestion = data['data']['_embedded']['attractions'];
      }
      console.log(this.suggestion);
    })
  }

  initializeForm() {
    this.eventform.setValue({
      keyword: null,
      distance: null,
      category: 'default',
      location: null,
      autoloc: null,
    })
  }



  autodetect(e:any) {

    if(e.checked){
      this.appservice.fetchIpinfo().subscribe(res =>{
        this.locationInfo = res.loc;
        this.eventform.controls['location'].reset();
        this.locFetched = true;
        //this.showBox = false;
        this.eventform.controls['location'].disable()
        console.log(this.locationInfo)
      })
    }

    else{
      this.eventform.value.location='';
      this.locFetched = false;
      //this.showBox = true;
      this.eventform.controls['location'].enable()
    }
  }

  showTable(): void {
    console.log('table')
    //console.log(this.eventform.controls['keyword'])
    console.log(this.autokey)

    if (this.eventform.controls['distance'].value == '' || this.eventform.controls['distance'].value == null){
      this.dist = "10"
    }
    else{
      this.dist = this.eventform.controls['distance'].value
    }
    this.appservice.fetchEvents(this.autokey.value, this.eventform.controls['category'].value, this.dist, this.locationInfo).subscribe(res =>{
      console.log("in fetchdetails");
      console.log(typeof(res))
      console.log("AAAAAAAAAAAAAAAAAAAAAA")
      console.log(res['data']['_embedded']['events'])
      console.log("AAAAAAAAAAAAAAAAAAAAAA")
      let events :any = res['data']['_embedded']['events']
      events.sort((a:any, b:any) =>{
        let day1Date = a?.dates?.start?.localDate
        let day1Time = a?.dates?.start?.localTime
        let day2Date = b?.dates?.start?.localDate
        let day2Time = b?.dates?.start?.localTime
        let aa = new Date(`${day1Date} ${day1Time}`)
        let bb = new Date(`${day2Date} ${day2Time}`)
        return aa.getTime()-bb.getTime()
      })
      res['data']['_embedded']['events'] = events
      // Array.prototype.slice.call(res['data']['_embedded']['events']).sort((a:any,b:any) =>{
      //   console.log(a)
      //   console.log(b)
      //   if (a?.dates?.start?.dateTime && b?.dates?.start?.dateTime){
      //     return <any>new Date(b.dates.start.dateTime) - <any>new Date(a.dates.start.dateTime)
      //   }
      //   return <any>new Date(b.dates.start.localDate) - <any>new Date(a.dates.start.localDate)
      // })
      this.eventFetch(res['data'])
    })

  }
  searchForm(): any {
    console.log('here');
    console.log(this.eventform.controls['category'].value);

    if (this.locFetched == true){
      this.showTable()
    }

    else{
      this.appservice.fetchGoogleMaps(this.eventform.controls['location'].value).subscribe(res =>{
        if (res['status']!="OK"){
          alert("Please Enter a correct location");
          this.locationInfo = ''
        }

        else{
          this.locationInfo = res['results']['0']['geometry']['location'].lat + ',' + res['results']['0']['geometry']['location'].lng
          console.log(this.locationInfo)
          this.showTable();
        }
      })
    }
  }

  clearAll():void{
    this.eventform.setValue({
      keyword: null,
      distance: null,
      category: 'default',
      location: null,
      autoloc: null,
    })
    this.eventform.controls['location'].enable()
    this.locFetched = false;
    this.eventClear();
  }
}
