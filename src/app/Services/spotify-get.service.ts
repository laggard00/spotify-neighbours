import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopItems } from '../Models/ProfileItems';
import { HttpHeaders } from '@angular/common/http';
import { TopArtist } from '../Models/TopArtists';




@Injectable({
  providedIn: 'root'
})
export class SpotifyGetService {

  private readonly topTracksUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term';
  private readonly topArtistUrl = 'https://api.spotify.com/v1/me/top/artists?limit=10&offset=0';


  accessToken:string | null = sessionStorage.getItem('accessToken');
  constructor(public http: HttpClient) { }

  getTopTracksData(): Observable<TopItems> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    return this.http.get<TopItems>(this.topTracksUrl, { headers });
  }

  getTopArtistData(): Observable<TopArtist> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    return this.http.get<TopArtist>(this.topArtistUrl, { headers });
  }
}
