import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfitService {
  constructor(private http : HttpClient, private baseService : BaseService) { }

  public findProfits(){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/profit/`;
    return this.http.get(url, { headers : headers } );
  }
  public findProfitOf(restaurantId : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/profit/${restaurantId}`;
    return this.http.get(url, { headers : headers } );
  }
}
