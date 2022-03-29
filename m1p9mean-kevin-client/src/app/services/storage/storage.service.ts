import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /*
  * BASKET
  */
  public getBasket(){
    let tmp = sessionStorage.getItem('basket');
    if(!tmp) return [];
    return JSON.parse(tmp);
  }
  public resetBasket(){
    return sessionStorage.setItem('basket', "[]");
  }
  public setBasket(basket : any){
    sessionStorage.setItem('basket', JSON.stringify(basket));
  }

  /*
  * PROFILE
  */
  public getProfile(){
    if(!localStorage['profile'] ) return null;
    return JSON.parse( localStorage['profile'] );
  }
  public setProfile(profile : any){
    localStorage['profile'] = JSON.stringify(profile);
  }

   /*
  * USER TOKEN
  */
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
