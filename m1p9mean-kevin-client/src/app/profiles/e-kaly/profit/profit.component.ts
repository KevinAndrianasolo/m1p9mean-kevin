import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { ProfitService } from 'src/app/services/profit/profit.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {
  public onLoading : boolean = false;
  public profits : any[] = [];
  public restaurants : any[] = [];
  public restaurantMap : any = {};
  constructor(private popupService : PopupService, private profitService : ProfitService, private api : ApiService) { }

  async ngOnInit() {
    
    await this.InitRestaurants();
    await this.InitProfits();
  }
  public InitRestaurantMap(){
    for(let i=0; i<this.restaurants.length; i++){
      this.restaurantMap[this.restaurants[i]._id] = this.restaurants[i];
    }
  }
  public async InitRestaurants(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findAll(Collections.RESTAURANT).toPromise();
      if(res['META']['status'] == "200"){
        this.restaurants = res['DATA'];
        this.InitRestaurantMap();
        console.log(this.restaurantMap);
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
      let res : any = await this.profitService.findProfits().toPromise();
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
