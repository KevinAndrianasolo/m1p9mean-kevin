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
  public restaurantEmployees : any[] = [];
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute, private router : Router) { }

  async ngOnInit() {
    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    await this.InitRestaurant();
    await this.InitRestaurantEmployees();
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
  public async InitRestaurantEmployees(){
    try{
      this.onLoading = true;
      let res : any = await this.api.find(Collections.RESTAURANT_EMPLOYEE, {restaurantId : this.restaurantId}).toPromise();
      if(res['META']['status'] == "200"){
        let restaurantEmployees = res['DATA'];
        this.restaurantEmployees = await this.initUsers(restaurantEmployees);
        console.log(this.restaurantEmployees);
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
  public async initUsers(restaurantEmployees : any[]){
    for(let i=0; i<restaurantEmployees.length; i++){
      let user = await this.getUser(restaurantEmployees[i].userId);
      restaurantEmployees[i].user = user;
    }
    return restaurantEmployees;
  }
  public async getUser(userId : any){
    let res : any = await this.api.findById(Collections.USER, userId).toPromise();
      if(res['META']['status'] == "200"){
        let user = res['DATA'];
        delete user.password;
        return user;
      }
      else{
        throw new Error(res['META']['message']);
      }
  }
  public edit(){
    this.router.navigateByUrl(`/e-kaly/restaurant-form?restaurantId=${this.restaurantId}`);
  }
  public async delete(){
    try{
      this.onLoading = true;
      let res : any = await this.api.delete(Collections.RESTAURANT, this.restaurantId).toPromise();
      if(res['META']['status'] == "200"){
        this.router.navigateByUrl(`/e-kaly/management`);
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

  public async deleteEmployee(userId : any){
    try{
      this.onLoading = true;
      let res : any = await this.api.delete(Collections.RESTAURANT_EMPLOYEE, userId).toPromise();
      if(res['META']['status'] == "200"){
        await this.InitRestaurantEmployees();
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
