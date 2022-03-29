import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public _base_url = BASE_URL;
  constructor(public storageService : StorageService) { }

  getHeaderInstance(authorization : boolean = false){
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json');
    if(authorization) {
      headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', this.storageService.getAccountToken());
    }
    return headers;
  }
}
