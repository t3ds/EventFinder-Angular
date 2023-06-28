import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { AppService } from '../search/app.service';
import {ThemePalette} from '@angular/material/core';
import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { GmapCardComponent } from '../gmap-card/gmap-card.component';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DetailCardComponent implements OnChanges{

  constructor(private appservice: AppService,
    public dialog: MatDialog){}
  
  
  VenueInfo:any = [];
  venueAdd?:any = [];
  artistDisplay ?: any = []
  artistInfo?:any = [];
  genreInfo?:any = [];
  item:any = [];
  isFavourite:boolean=false;
  color: ThemePalette = "warn";
  ohShow:boolean = false;
  grShow:boolean = false;
  crShow:boolean= false;
  done:boolean= false;
  txt:string = "music related artists"
  @Input() eventDetails:any;
  @Output() backEvent= new EventEmitter<boolean>();

  goBack(): void{
    this.backEvent.emit(false)
  }

  ngOnChanges(changes: SimpleChanges): void {
    //ngOnInit():void{
    console.log('changes', changes);
    if(this.eventDetails){
    this.done = false
    this.artistInfo=[]
      this.genreInfo=[]
      this.isFavourite=false
      this.artistDisplay=[]
      this.artistDisplay.length = 0;
      this.item=[]
      this.artistInfo = [];
      this.ohShow = false;
    this.grShow = false;
    this.crShow = false;
      this.VenueInfo = [];
      this.venueAdd = [];

      console.log("checking:")
      console.log(this.artistDisplay)
      console.log(this.artistInfo)

      console.log('--------------------Event Details------------------------')
      console.log(this.eventDetails)

    this.startFunc()
    }
  }

  startFunc() {  
    //if(this.eventDetails){

      // this.artistInfo=[]
      // this.genreInfo=[]
      // this.isFavourite=false
      // this.artistDisplay=[]
      // this.item=[]

      // this.VenueInfo = [];
      // this.venueAdd = [];

      console.log(this.eventDetails)
      this.appservice.fetchVenueDetails(this.eventDetails['_embedded']['venues']['0'].name).subscribe(res => {
      console.log("++++++++++++++IN VENUE++++++++++++++++++++")
      console.log(this.eventDetails)
      this.VenueInfo = res['data']
      this.venueAdd=[];
      
      if (this.VenueInfo?._embedded?.venues['0']?.address?.line1){
        this.venueAdd.push(this.VenueInfo._embedded.venues['0'].address.line1)
      }

      if (this.VenueInfo?._embedded?.venues['0']?.city?.name){
        this.venueAdd.push(this.VenueInfo._embedded.venues['0'].city.name)
      }

      if (this.VenueInfo?._embedded?.venues['0']?.state?.name){
        this.venueAdd.push(this.VenueInfo._embedded.venues['0'].state.name)
      }

      // get arts
      if(this.eventDetails?._embedded?.attractions){
        console.log(this.artistDisplay)
        this.artistDisplay.length = 0
        this.artistInfo.length=0
        for (let artist in this.eventDetails._embedded.attractions){
          console.log(this.eventDetails._embedded.attractions[artist].name)
          if (this.eventDetails?._embedded?.attractions[artist]?.name){
            this.artistDisplay.push(this.eventDetails._embedded.attractions[artist].name)
            console.log("IN FOR LOOP:")
            console.log(this.artistDisplay)
          }
        }
      }
      
        if(this.eventDetails?.classifications['0']?.segment?.name == "Music"){
          this.artistInfo = []
          console.log(this.artistDisplay)
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
          // this.artistDisplay = this.artistDisplay.reverse()
          this.appservice.fetchArtistInfo(this.artistDisplay).subscribe(res=>{
            this.artistInfo = res['data']
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            console.log(this.artistInfo)


            
      

          })
          // for(let artist in this.artistDisplay){
          //   console.log(this.artistDisplay[artist])
          //   this.appservice.fetchArtistInfo(this.artistDisplay[artist]).subscribe(res=>{
          //     this.artistInfo.push(res['data']);
          //     console.log('artists:')
          //     console.log(res)
          //   })
    
          //   console.log(this.artistInfo)
          // }
  
        }

        if(this.eventDetails?.classifications){
          this.genreInfo.length=0
          if (this.eventDetails.classifications['0']?.segment && this.eventDetails.classifications['0'].segment.name != "Undefined"){
            this.genreInfo.push(this.eventDetails.classifications['0'].segment.name)
          }
    
          if (this.eventDetails.classifications['0']?.genre && this.eventDetails.classifications['0'].genre.name != "Undefined"){
            this.genreInfo.push(this.eventDetails.classifications['0'].genre.name)
          }
    
          if (this.eventDetails.classifications['0']?.subGenre && this.eventDetails.classifications['0'].subGenre.name != "Undefined"){
            this.genreInfo.push(this.eventDetails.classifications['0'].subGenre.name)
          }
    
          if (this.eventDetails.classifications['0']?.type && this.eventDetails.classifications['0'].type.name != "Undefined"){
            this.genreInfo.push(this.eventDetails.classifications['0'].type.name)
          }
    
          if (this.eventDetails.classifications['0']?.subType && this.eventDetails.classifications['0'].subType.name != "Undefined"){
            this.genreInfo.push(this.eventDetails.classifications['0'].subType.name)
          }
        }
  
       
  
      
      if(localStorage.getItem(this.eventDetails.id)){
        console.log(this.eventDetails.id)
        this.isFavourite=true;
      }
    console.log("ALL ARTISTS:")
    console.log(this.artistInfo)
    console.log(this.genreInfo)

      
      this.done = true
    })
    

    // if(this.eventDetails?._embedded?.attractions){
    //   for (let artist in this.eventDetails._embedded.attractions){
    //     console.log(artist)
    //     if (this.eventDetails?._embedded?.attractions[artist]?.name){
    //       this.artistDisplay.push(this.eventDetails._embedded.attractions[artist].name)
    //     }
    //   }

    //   if(this.eventDetails?.classifications['0']?.segment?.name == "Music"){
    //     this.artistInfo = []
    //     console.log(this.artistDisplay)
    //     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //     // this.artistDisplay = this.artistDisplay.reverse()
    //     this.appservice.fetchArtistInfo(this.artistDisplay).subscribe(res=>{
    //       this.artistInfo = res['data']
    //       console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //       console.log(this.artistInfo)
    //     })
    //     // for(let artist in this.artistDisplay){
    //     //   console.log(this.artistDisplay[artist])
    //     //   this.appservice.fetchArtistInfo(this.artistDisplay[artist]).subscribe(res=>{
    //     //     this.artistInfo.push(res['data']);
    //     //     console.log('artists:')
    //     //     console.log(res)
    //     //   })
  
    //     //   console.log(this.artistInfo)
    //     // }

    //   }

    //   if(this.eventDetails?.classifications){
    //     if (this.eventDetails.classifications['0']?.segment && this.eventDetails.classifications['0'].segment.name != "Undefined"){
    //       this.genreInfo.push(this.eventDetails.classifications['0'].segment.name)
    //     }
  
    //     if (this.eventDetails.classifications['0']?.genre && this.eventDetails.classifications['0'].genre.name != "Undefined"){
    //       this.genreInfo.push(this.eventDetails.classifications['0'].genre.name)
    //     }
  
    //     if (this.eventDetails.classifications['0']?.subGenre && this.eventDetails.classifications['0'].subGenre.name != "Undefined"){
    //       this.genreInfo.push(this.eventDetails.classifications['0'].subGenre.name)
    //     }
  
    //     if (this.eventDetails.classifications['0']?.type && this.eventDetails.classifications['0'].type.name != "Undefined"){
    //       this.genreInfo.push(this.eventDetails.classifications['0'].type.name)
    //     }
  
    //     if (this.eventDetails.classifications['0']?.subType && this.eventDetails.classifications['0'].subType.name != "Undefined"){
    //       this.genreInfo.push(this.eventDetails.classifications['0'].subType.name)
    //     }
    //   }

    //   this.appservice.fetchVenueDetails(this.eventDetails._embedded.venues[0].name).subscribe(res =>{
    //     console.log(this.eventDetails._embedded.venues[0].name)
    //     this.VenueInfo = res['data'];
    //     console.log(res);
    //     this.venueAdd=[];

    //     if (this.VenueInfo?._embedded?.venues['0']?.address?.line1){
    //       this.venueAdd.push(this.VenueInfo._embedded.venues['0'].address.line1)
    //     }

    //     if (this.VenueInfo?._embedded?.venues['0']?.city?.name){
    //       this.venueAdd.push(this.VenueInfo._embedded.venues['0'].city.name)
    //     }

    //     if (this.VenueInfo?._embedded?.venues['0']?.state?.name){
    //       this.venueAdd.push(this.VenueInfo._embedded.venues['0'].state.name)
    //     }
    //   })

    // }

    // if(localStorage.getItem(this.eventDetails.id)){
    //   console.log(this.eventDetails.id)
    //   this.isFavourite=true;
    // }
    //}

  }


  updateStatus(){
    if(this.isFavourite){
      localStorage.removeItem(this.eventDetails.id);
      this.isFavourite=false;
      alert("Removed From Favourites!")
    }
    else{

      this.item.push(this.eventDetails?.dates?.start?.localDate)
    this.item.push(this.eventDetails.name)
    this.item.push(this.genreInfo)
    this.item.push(this.eventDetails['_embedded']['venues']['0'].name)
      localStorage.setItem(this.eventDetails.id, JSON.stringify(this.item))
      this.isFavourite = true;
      alert("Event Added to Favourites")
    }
  }
  openDialog(): void{
    const dialogRef = this.dialog.open(GmapCardComponent, {
      data: { lat: Number(this.VenueInfo._embedded.venues[0].location.latitude), lng: Number(this.VenueInfo._embedded.venues[0].location.longitude) }
    });

    dialogRef.afterClosed().subscribe(res =>{
      console.log("dialog was closed")
    })
  }
}
