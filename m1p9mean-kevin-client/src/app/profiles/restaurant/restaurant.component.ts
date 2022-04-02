import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public onLoading : boolean = false;
  constructor(private api : ApiService, private popupService : PopupService, private storageService : StorageService) { }

  async ngOnInit() {
    await this.InitRestaurantId();
  }
  public async InitRestaurantId(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findOne(Collections.RESTAURANT_EMPLOYEE, {}, true).toPromise();
      if(res['META']['status'] == "200"){
        let restaurantEmployee = res['DATA'];
        console.log(restaurantEmployee);
        if(!restaurantEmployee) throw new Error("Vous n'avez pas de restaurant");
        this.storageService.setRestaurantId(restaurantEmployee.restaurantId);
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
