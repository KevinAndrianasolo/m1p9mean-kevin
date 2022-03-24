import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private onLoading : boolean = false;
  constructor(private popupService : PopupService, private storageService : StorageService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  public async login(loginForm : NgForm){
    let user = loginForm.value;
    try{
      this.onLoading = true;
      let res : any = await this.authService.login(user).toPromise();
      if(res['META']['status'] == "200"){
        let token = res['DATA'];
        this.storageService.setAccountToken(token);
        this.router.navigateByUrl('/client');
      }
      else{
        throw new Error(res['META']['message']);
      }      
    }
    catch(err : any){
      this.popupService.showError(err.message);
    }
    finally{
      this.onLoading = false;
    }
  }
}
