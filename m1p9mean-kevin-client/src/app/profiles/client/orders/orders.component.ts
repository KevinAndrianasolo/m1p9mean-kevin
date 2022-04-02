import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { OrderState } from 'src/app/classes/OrderState';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public onLoading : boolean = false;
  public orders : any [] = [];
  public query : any = {};
  public OrderState : any = OrderState;
  public orderStateFilter : any = "";
  public orderStateKeys : any = Object.keys(OrderState.map);
  constructor(private api : ApiService, private popupService : PopupService, private storageService : StorageService) { }

  async ngOnInit() {
    await this.InitOrders();
  }
  public async InitRestaurantOfOrders(orders : any[]){
    for(let i=0; i<orders.length; i++){
      orders[i].restaurant = await this.getRestaurant(orders[i].restaurantId);
    }
    return orders;
  }
  public async findOrderWithState(orderStateId : any){
    if(!orderStateId) delete this.query['orderStateId'];
    else this.query['orderStateId'] = orderStateId;
    await this.InitOrders();
  }
  public async getRestaurant(restaurantId : any){
    let res : any = await this.api.findById(Collections.RESTAURANT, restaurantId).toPromise();
      if(res['META']['status'] == "200"){
        let restaurant = res['DATA'];
        return restaurant;
      }
      else{
        throw new Error(res['META']['message']);
      }
  }
  public async payOrder(orderId : any){
    console.log(orderId);
    try{
      this.onLoading = true;
      let res : any = await this.api.update(Collections.ORDER, orderId, {orderStateId : OrderState.DELIVERED_AND_PAID} ).toPromise();
      if(res['META']['status'] == "200"){
        await this.InitOrders();
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
  public async InitOrders(){
    try{
      if(!this.storageService.getAccountToken()){
        this.orders = [];
        return;
      } 

      this.onLoading = true;
      let res : any = await this.api.find(Collections.ORDER, this.query , true).toPromise();
      if(res['META']['status'] == "200"){
        let orders = res['DATA'];
        this.orders = await this.InitRestaurantOfOrders(orders);
        console.log(this.orders);
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
  public search(){
    this.findOrderWithState(this.orderStateFilter);
  }

}
