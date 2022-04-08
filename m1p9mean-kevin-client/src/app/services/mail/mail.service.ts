import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor(private http : HttpClient, private baseService : BaseService) { }

  public sendMail(mail : any){
    let headers = this.baseService.getHeaderInstance()
    let url = `${this.baseService._base_url}/mail/`;
    return this.http.post(url, mail, { headers : headers } );
  }
}
