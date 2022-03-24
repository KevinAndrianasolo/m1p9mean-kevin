import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public getAccountToken(){
    let token = localStorage['account_token']==undefined ? "" : localStorage['account_token'];
    return token;
  }
  public setAccountToken(token : string){
    localStorage['account_token'] = token;
  }
  public clearAccountToken(){
    localStorage.removeItem('account_token');
  }
  public isAuthentificated() : boolean{
    return localStorage['account_token']!=undefined && localStorage['account_token']!="";
  }
  public clear(){
    localStorage.clear();
  }
}
