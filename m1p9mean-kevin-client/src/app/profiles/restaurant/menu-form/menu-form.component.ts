import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  public form : any =  {};
  public onLoading : boolean = false;
  public isUpdate : boolean = false;

  public restaurantId : any = null;
  public menuId : any = null;
  constructor(private popupService : PopupService, private api : ApiService, private storageService : StorageService, private router : Router, private activatedRoute : ActivatedRoute) { }

  async ngOnInit() {
    this.restaurantId = this.storageService.getRestaurantId();
    this.menuId = this.activatedRoute.snapshot.queryParams['menuId'];
    if(this.menuId) {
      await this.InitMenu();
      this.isUpdate = true;
    }
  }
  public async InitMenu(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findById(Collections.MENU, this.menuId).toPromise();
      if(res['META']['status'] == "200"){
        this.form = res['DATA'];
        delete this.form._id;
        console.log(this.form);
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
  public isValid(){
    return this.form.name && this.form.description && this.form.unitPrice && !isNaN(this.form.unitPrice);
  }
  public async formSubmit(){
    
    try{
      if(!this.isValid()) throw new Error('Veuillez vérifier le formulaire.');
      this.onLoading = true;
      let res : any = null;
      if(this.isUpdate) res = await this.api.update(Collections.MENU, this.menuId, this.form).toPromise();
      else 
      {
        this.form.restaurantId = this.restaurantId;
        this.form.isVisible = true;
        res = await this.api.save(Collections.MENU, this.form).toPromise();
      }
      console.log(this.form);
      if(res['META']['status'] == "200"){
        this.router.navigateByUrl('/restaurant/management');
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
