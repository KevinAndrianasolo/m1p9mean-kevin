import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { Profiles } from 'src/app/classes/Profiles';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  public form : any =  {};
  public onLoading : boolean = false;

  public restaurant : any = {};
  public managers : any[] = [];
  public restaurantId : number = -1;
  constructor(private popupService : PopupService, private api : ApiService, private storageService : StorageService, private router : Router, private activatedRoute : ActivatedRoute) { }

  async ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    await this.InitRestaurant();
    await this.InitRestaurantManagers();
  }
  public async InitRestaurant(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findById(Collections.RESTAURANT, this.restaurantId).toPromise();
      if(res['META']['status'] == "200"){
        this.restaurant = res['DATA'];
        console.log(this.restaurant);
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
  public async InitRestaurantManagers(){
    try{
      this.onLoading = true;
      let res : any = await this.api.find(Collections.USER, {profileId : Profiles.RESTAURANT}).toPromise();
      if(res['META']['status'] == "200"){
        this.managers = res['DATA'];
        console.log(this.managers);
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
    return  this.form.userId;
  }
  public async formSubmit(){
    
    try{
      if(!this.isValid()) throw new Error('Veuillez vérifier le formulaire.');
      this.form.restaurantId = this.restaurantId;
      console.log(this.form);
      this.onLoading = true;
      let res : any = await this.api.save(Collections.RESTAURANT_EMPLOYEE, this.form).toPromise();
      console.log(this.form);
      if(res['META']['status'] == "200"){
        this.router.navigateByUrl('/e-kaly/restaurant/'+this.restaurantId);
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
