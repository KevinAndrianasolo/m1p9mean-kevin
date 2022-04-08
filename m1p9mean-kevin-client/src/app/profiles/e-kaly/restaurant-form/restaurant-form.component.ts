import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {

  public form : any =  {};
  public onLoading : boolean = false;
  public isUpdate : boolean = false;

  public restaurantId : any = null;
  constructor(private popupService : PopupService, private api : ApiService, private storageService : StorageService, private router : Router, private activatedRoute : ActivatedRoute) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    this.restaurantId = this.storageService.getRestaurantId();
    this.restaurantId = this.activatedRoute.snapshot.queryParams['restaurantId'];
    if(this.restaurantId) {
      await this.InitRestaurant();
      this.isUpdate = true;
    }
  }
  public async InitRestaurant(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findById(Collections.RESTAURANT, this.restaurantId).toPromise();
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
    return this.form.name && this.form.description && this.form.address;
  }
  public async formSubmit(){
    
    try{
      if(!this.isValid()) throw new Error('Veuillez vérifier le formulaire.');
      console.log(this.form);
      this.onLoading = true;
      let res : any = null;
      if(this.isUpdate) res = await this.api.update(Collections.RESTAURANT, this.restaurantId, this.form).toPromise();
      else 
      {
        res = await this.api.save(Collections.RESTAURANT, this.form).toPromise();
      }
      console.log(this.form);
      if(res['META']['status'] == "200"){
        this.router.navigateByUrl('/e-kaly/management');
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
