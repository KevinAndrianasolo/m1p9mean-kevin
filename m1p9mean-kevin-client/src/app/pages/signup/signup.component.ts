import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profiles } from 'src/app/classes/Profiles';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public onLoading : boolean = false;
  public profileKeys : any[] = Object.keys(Profiles.map);
  public Profiles : any = Profiles;
  // public signupForm = new FormGroup({
  //   lastname: new FormControl("Andrianasolo Lala", [
  //     Validators.required
  //   ]),
  //   firstname: new FormControl("Andrianasolo Lala", [
  //     Validators.required
  //   ])
  // });
  constructor(private popupService : PopupService, private storageService : StorageService, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.storageService.clear();
  }

  public isValid(user : any){
    return user.lastname && user.firstname && user.birthDate && user.profileId && user.username && user.password
      && user.lastname!="" && user.firstname!="" && user.birthDate!="" && user.profileId!="" && user.username!="" && user.password!="";
  }
  public async signup(signupForm : NgForm){
    let user = signupForm.value;
    console.log(user);
    
    try{
      if(!this.isValid(user)) throw new Error("Utilisateur invalide");
      this.onLoading = true;
      let res : any = await this.authService.signup(user).toPromise();
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
