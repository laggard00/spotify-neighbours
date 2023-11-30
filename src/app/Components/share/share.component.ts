import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit{


  constructor(public route :ActivatedRoute, public router:Router) {
  }

  ngOnInit(): void {

    this.route.queryParams.pipe(filter(params => 'topArtists' in params || 'topTracks' in params || 'artists' in params))
      .subscribe((params) => {
        if ('topArtists' in params) {
          console.log('topArtists', params['topArtists']);
        }

        if ('topTracks' in params) {
          
          console.log('Other Param:', params['topTracks']);
        }
        if ('artists' in params) {
          
          console.log('Other Param:', params['artists']);
        }
       
    });
    this.router.navigate(['dashboard']);

    
  }

}
