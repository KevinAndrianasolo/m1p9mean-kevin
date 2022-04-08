import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public onLoading : boolean = false;
  public restaurants : any [] = [];
  public toSearch : string = "";
  constructor(private api : ApiService, private popupService : PopupService) { }

  async ngOnInit() {
    await this.InitRestaurants();
  }
  public async search(){
    try{
      this.onLoading = true;
      let res : any = await this.api.find(Collections.RESTAURANT, {name:{ $regex: this.toSearch, $options: 'i' }}).toPromise();
      if(res['META']['status'] == "200"){
        this.restaurants = res['DATA'];
        console.log(this.restaurants);
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
  public async InitRestaurants(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findAll(Collections.RESTAURANT).toPromise();
      if(res['META']['status'] == "200"){
        this.restaurants = res['DATA'];
        console.log(this.restaurants);
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
