import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient, private baseService : BaseService) { }

  public findAll(model : string){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/${model}`;
    return this.http.get(url, { headers : headers } );
  }
  public findById(model : string, id : number){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/${model}/${id}`;
    return this.http.get(url, { headers : headers } );
  }
  public find(model : string, obj : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/${model}/find`;
    return this.http.post(url, obj, { headers : headers } );
  }
  public save(model : string, obj : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/${model}`;
    return this.http.post(url, obj, { headers : headers } );
  }
  public update(model : string, id : number, obj : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/${model}/${id}`;
    return this.http.put(url, obj, { headers : headers } );
  }
  public delete(model : string, id : number){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/${model}/${id}`;
    return this.http.delete(url, { headers : headers } );
  }
}
