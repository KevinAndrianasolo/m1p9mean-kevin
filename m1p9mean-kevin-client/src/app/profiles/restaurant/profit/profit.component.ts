import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { ProfitService } from 'src/app/services/profit/profit.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {

  public onLoading : boolean = false;
  public profits : any[] = [];
  public restaurant : any = {};
  public restaurantId : any = null;
  constructor(private popupService : PopupService, private profitService : ProfitService, private api : ApiService, private storageService : StorageService) { }

  async ngOnInit() {
    this.restaurantId = this.storageService.getRestaurantId();
    await this.InitRestaurant();
    await this.InitProfits();
  }

  public async getRestaurant(restaurantId : any){
    
  }
  public async InitRestaurant(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findById(Collections.RESTAURANT, this.restaurantId).toPromise();
      if(res['META']['status'] == "200"){
        this.restaurant = res['DATA'];
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
  public async InitProfits(){
    try{
      this.onLoading = true;
      let res : any = await this.profitService.findProfitOf(this.restaurantId).toPromise();
      if(res['META']['status'] == "200"){
        this.profits = res['DATA'];
        console.log(this.profits);
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
