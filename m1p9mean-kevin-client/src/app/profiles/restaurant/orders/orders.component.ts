import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { OrderState } from 'src/app/classes/OrderState';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';

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
  constructor(private api : ApiService, private popupService : PopupService) { }

  async ngOnInit() {
    await this.InitOrders();
  }

  public async findOrderWithState(orderStateId : any){
    if(!orderStateId) delete this.query['orderStateId'];
    else this.query['orderStateId'] = orderStateId;
    await this.InitOrders();
  }
  public async InitOrders(){
    try{
      this.onLoading = true;
      let res : any = await this.api.find(Collections.ORDER, this.query ).toPromise();
      if(res['META']['status'] == "200"){
        this.orders = res['DATA'];
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

}
