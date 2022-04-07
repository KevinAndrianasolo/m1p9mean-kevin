import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private baseService : BaseService) { 

  }
  public logout(){
    let headers = this.baseService.getHeaderInstance(true)
    let url = `${this.baseService._base_url}/auth/logout`;
    return this.http.delete(url, { headers : headers } );
  }
  public login(user : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/auth/login`;
    return this.http.post(url, user, { headers : headers } );
  }
  public signup(user : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/auth/signup`;
    return this.http.post(url, user, { headers : headers } );
  }
  public checkAuth(userTokenId : string, profileId : string){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/auth/check`;
    let obj = {
      userTokenId : userTokenId,
      profileId : profileId
    };
    return this.http.post(url, obj, { headers : headers } );
  }

  async isAuthentificated(){
    let userTokenId = this.baseService.storageService.getAccountToken();
    let profile = this.baseService.storageService.getProfile();
    if(!userTokenId || !profile) return false;

    let res : any = await this.checkAuth(userTokenId, profile['_id']).toPromise();
    if(res['META']['status'] == "200"){
      let isOk = res['DATA'];
      return isOk;
    }
    return false;
  }

}
