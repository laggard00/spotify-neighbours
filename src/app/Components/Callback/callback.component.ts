import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserProfile } from 'src/app/Models/User';
import { SpotifyAuthService } from 'src/app/Services/spotify-auth.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  code:string="";
  accessToken:any="";

  constructor(private route: ActivatedRoute, public spotifyAuth:SpotifyAuthService, private router : Router) { }

  ngOnInit(): void {

    this.route.queryParams.pipe(filter(params => 'code' in params)).subscribe((params) => {
       this.code = params['code'];
       console.log(this.code);
       this.loginMethod(this.code);
    });

    
  }
  async loginMethod(code2:string) {

    try {
      console.log(this.spotifyAuth.isLoggedIn());
      await this.spotifyAuth.getAccessToken(code2)
                            .then((result:any)=>{sessionStorage.setItem('accessToken',result); this.accessToken=result;});

      const result: UserProfile = await this.spotifyAuth.fetchProfile(this.accessToken);
      sessionStorage.setItem('spotifyId', result.display_name);
      this.router.navigate(['dashboard']);
      
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  }
}
