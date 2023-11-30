import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAuthService } from 'src/app/Services/spotify-auth.service';
import { SpotifyGetService } from 'src/app/Services/spotify-get.service';
import { HttpClient } from '@angular/common/http';
import { TopItems } from 'src/app/Models/ProfileItems';
import { TopArtist } from 'src/app/Models/TopArtists';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public topArtists:TopArtist | null=null;
  public topTracks:TopItems | null=null;
  
 
  constructor(public spotify:SpotifyAuthService, private router :Router, public data:SpotifyGetService) {
    spotify.spotifyId=sessionStorage.getItem('spotifyId');
    spotify.accessToken = sessionStorage.getItem('accessToken');
    
  }
  ngOnInit():void{
    console.log(this.spotify.spotifyId);
    if(this.spotify.spotifyId =='' || this.spotify.spotifyId==undefined){
      this.router.navigate(['']);
      
    }
    else{
      this.data.getTopArtistData().subscribe((x:TopArtist)=>this.topArtists=x);
      this.data.getTopTracksData().subscribe((x:TopItems)=> this.topTracks=x);
    }
    
  }
  clicky(){ this.data.getTopTracksData().subscribe((tha:any)=> console.log(tha));
    }
  

  createSharableUrl() {
     let shareableTopArtists:string |undefined= this.topArtists?.items.map(x=>x.name).join("/");
     let shareableTopTracks:string|undefined = this.topTracks?.items.map(x=> x.name).join("/")
     let shareableArtisOfTracks: string |undefined = this.topTracks?.items.map(x=> x.artists[0].name).join("/");

     console.log(shareableTopArtists);
     console.log(shareableTopTracks);
     console.log(shareableArtisOfTracks);
     console.log(sessionStorage.getItem('spotifyId'));
      console.log(`localhost:4200/share?topArtists=${encodeURIComponent(shareableTopArtists || "")}&topTracks=${encodeURIComponent(shareableTopTracks||"")}&artists=${encodeURIComponent(shareableArtisOfTracks||"")}`);
     

    }

}
