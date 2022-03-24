import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private baseService : BaseService) { 

  }
  public login(user : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/auth/login`;
    return this.http.post(url, user, { headers : headers } );
  }
}
