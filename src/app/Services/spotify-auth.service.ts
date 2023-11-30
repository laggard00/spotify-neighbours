import { Injectable } from '@angular/core';
import { UserProfile } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

readonly clientID : string ="23750de75a364ecbb6f092b9028889ea";
public accessToken : string | null = sessionStorage.getItem('accessToken') || '';
public spotifyId  : string |null =sessionStorage.getItem('spotifyId') || '';

constructor() { 
}

whenClicked(){
  this.redirectToAuthFlow(this.clientID);
  
}


 async  redirectToAuthFlow(clientId:string){
    const verifier =await this.generateCodeVerifier(128);
    const challenge = await this.generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:4200/callback");
    params.append("scope", "user-read-private user-top-read user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async getAccessToken(code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", this.clientID);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:4200/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
  }

async  fetchProfile (token : string): Promise<UserProfile>{
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();

  }


  async generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async  generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
isLoggedIn ():boolean{
   if(sessionStorage.getItem('spotfyId')!='' ){return true;}
   return false;
}
}
