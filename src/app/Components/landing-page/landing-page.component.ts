import { Component } from '@angular/core';
import { SpotifyAuthService } from 'src/app/Services/spotify-auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
public spotifyAuth : SpotifyAuthService;

constructor(public SpotifyAuth : SpotifyAuthService) {
  this.spotifyAuth = SpotifyAuth;
  
}
}
