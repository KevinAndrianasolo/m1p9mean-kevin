import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public menus : any [] = [];
  public toSearch : string = "";
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute, private router : Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  async ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    await this.InitRestaurant();
    await this.InitMenus();
  }
  public async search(){
    try{
      this.onLoading = true;
      let res : any = await this.api.find(Collections.MENU, {restaurantId : this.restaurantId, name:{ $regex: this.toSearch, $options: 'i' }}).toPromise();
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

  public async InitMenus(){
    try{
      this.onLoading = true;
      let res : any = await this.api.find(Collections.MENU, {restaurantId : this.restaurantId}).toPromise();
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

}
