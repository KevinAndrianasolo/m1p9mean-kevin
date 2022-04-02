import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() profile : string = "";
  public onLoading : boolean = false;
  constructor(private router : Router, private authService : AuthService, private popupService : PopupService, private storageService : StorageService) { }

  ngOnInit(): void {
  }

  public goTo(url : string){
    this.router.navigateByUrl(url);
  }
  public async logout(){
    try{
      this.onLoading = true;
      let res : any = await this.authService.logout().toPromise();
      if(res['META']['status'] == "200"){
        this.storageService.clear();
        this.router.navigateByUrl(`/login`);
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
