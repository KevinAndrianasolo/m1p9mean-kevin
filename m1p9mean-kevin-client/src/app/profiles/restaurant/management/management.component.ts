import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  public restaurantId : any = "";
  public menus : any[] = [];
  public onLoading : boolean = false;
  public query : any =  {};
  public visibility : any = "";
  constructor(private api : ApiService, private popupService : PopupService, private storageService : StorageService, private router : Router) { }

  async ngOnInit(){
    this.restaurantId = this.storageService.getRestaurantId();
    this.query.restaurantId = this.restaurantId;
    await this.InitMenus();
  }
  public async filterWithVisibility(visibility : any){
    if(visibility=="") delete this.query['isVisible'];
    else this.query['isVisible'] = visibility === 'true';
    await this.InitMenus();
  }
  public search(){
    console.log(this.visibility);
    this.filterWithVisibility(this.visibility);
  }
  public async InitMenus(){
    try{
      this.onLoading = true;
      console.log(this.query);
      let res : any = await this.api.find(Collections.MENU, this.query).toPromise();
      if(res['META']['status'] == "200"){
        this.menus = res['DATA'];
        console.log(this.menus);
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
  public async toggleVisibility(iMenu : number){
    try{
      this.onLoading = true;
      let res : any = await this.api.update(Collections.MENU, this.menus[iMenu]._id, {isVisible : !this.menus[iMenu].isVisible} ).toPromise();
      if(res['META']['status'] == "200"){
        await this.InitMenus();
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
  public edit(menuId : any){
    this.router.navigateByUrl(`/restaurant/menu-form?menuId=${menuId}`)
  }
  public async delete(menuId : number){
    try{
      this.onLoading = true;
      let res : any = await this.api.delete(Collections.MENU, menuId).toPromise();
      if(res['META']['status'] == "200"){
        await this.InitMenus();
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
