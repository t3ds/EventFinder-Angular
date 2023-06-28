import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ipinfo, gmaps, eventsearch, eventInfo,venueInfo, artistInfo } from '../config/config';

const ipinfo_url = 'https://ipinfo.io';
const ipinfo_api = '#API';
const gmaps_url = 'https://maps.googleapis.com/maps/api/geocode/json';
const gmaps_api = '#API';

const backend = '#BACKEND'
//const backend = 'http://localhost:5000'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpclient: HttpClient) { }

  fetchIpinfo(): Observable<ipinfo>{
    return this.httpclient.get(`${ipinfo_url}?token=${ipinfo_api}`)
  }

  fetchGoogleMaps(addr: string): Observable<gmaps>{
    return this.httpclient.get(`${gmaps_url}?address=${addr}&key=${gmaps_api}`)
  }

  fetchEvents(keyword:string, segment: string, radius: string, geopoint: string): Observable<eventsearch>{
    return this.httpclient.get(`${backend}/events?keyword=${keyword}&segment=${segment}&radius=${radius}&geopoint=${geopoint}`)
  }

  fetchEventDetails(id:string): Observable<eventInfo>{
    return this.httpclient.get(`${backend}/eventdetails?id=${id}`)
  }

  fetchVenueDetails(keyword:string): Observable<venueInfo>{
    return this.httpclient.get(`${backend}/venuedetails?keyword=${keyword}`)
  }

  // fetchArtistInfo(name:string): Observable<artistInfo>{
  //   return this.httpclient.get(`${backend}/artistinfo?name=${name}`)
  // }
  fetchArtistInfo(artistDisplay:Array<string>): Observable<artistInfo>{
    return this.httpclient.get(`${backend}/artistinfo`, {params:{"artistDisplay": JSON.stringify(artistDisplay)}})
  }
}
