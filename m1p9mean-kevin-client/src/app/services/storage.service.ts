import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public getProfile(){
    return JSON.parse( localStorage['profile']);
  }
  public setProfile(profile : any){
    localStorage['profile'] = JSON.stringify(profile);
  }

  public getAccountToken(){
    let token = localStorage['userTokenId']==undefined ? "" : localStorage['userTokenId'];
    return token;
  }
  public setAccountToken(token : string){
    localStorage['userTokenId'] = token;
  }

  public clearAccountToken(){
    localStorage.removeItem('userTokenId');
  }
  public isAuthentificated() : boolean{
    return localStorage['userTokenId']!=undefined && localStorage['userTokenId']!="";
  }
  public clear(){
    localStorage.clear();
  }
}
