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
    let url = `${this.baseService._base_url}/api/reflect/${model}`;
    return this.http.get(url, { headers : headers } );
  }
  public findById(model : string, id : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/reflect/${model}/${id}`;
    return this.http.get(url, { headers : headers } );
  }
  public find(model : string, obj : any, authorization : boolean = false){
    let headers = this.baseService.getHeaderInstance(authorization);
    let url = `${this.baseService._base_url}/api/reflect/${model}/find`;
    return this.http.post(url, obj, { headers : headers } );
  }
  public findOne(model : string, obj : any, authorization : boolean = false){
    let headers = this.baseService.getHeaderInstance(authorization);
    let url = `${this.baseService._base_url}/api/reflect/${model}/findOne`;
    return this.http.post(url, obj, { headers : headers } );
  }
  public save(model : string, obj : any, authorization : boolean = false){
    let headers = this.baseService.getHeaderInstance(authorization)
    let url = `${this.baseService._base_url}/api/reflect/${model}`;
    return this.http.post(url, obj, { headers : headers } );
  }
  public saveAll(model : string, tab : any[], authorization : boolean = false){
    let headers = this.baseService.getHeaderInstance(authorization)
    let url = `${this.baseService._base_url}/api/reflect/${model}/saveAll`;
    console.log(headers);
    return this.http.post(url, tab, { headers : headers } );
  }
  public update(model : string, id : any, obj : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/reflect/${model}/${id}`;
    return this.http.put(url, obj, { headers : headers } );
  }
  public delete(model : string, id : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/api/reflect/${model}/${id}`;
    return this.http.delete(url, { headers : headers } );
  }
}
