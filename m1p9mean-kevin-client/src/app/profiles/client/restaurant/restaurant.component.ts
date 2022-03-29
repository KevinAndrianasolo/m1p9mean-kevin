import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  public onLoading : boolean = false;
  public restaurant : any  =  {};
  public restaurantId : number = -1;
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute) { }

  async ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    await this.InitRestaurant();
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

}
