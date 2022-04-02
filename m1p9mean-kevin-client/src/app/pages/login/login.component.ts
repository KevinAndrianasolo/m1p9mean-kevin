import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public onLoading : boolean = false;
  constructor(private popupService : PopupService, private storageService : StorageService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.storageService.clear();
  }

  public async login(loginForm : NgForm){
    let user = loginForm.value;
    try{
      this.onLoading = true;
      let res : any = await this.authService.login(user).toPromise();
      if(res['META']['status'] == "200"){
        let tmp = res['DATA'];
        let userTokenId = tmp.userTokenId;
        let profile = tmp.profile;

        this.storageService.setAccountToken(userTokenId);
        this.storageService.setProfile(profile);

        this.router.navigateByUrl(`/${profile['name']}`);
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
