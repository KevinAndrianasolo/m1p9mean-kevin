import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  public onLoading : boolean = false;
  public order : any  =  {};
  public orderId : number = -1;
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute, private router : Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  async ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    await this.InitOrder();
  }

  public async InitOrder(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findById(Collections.ORDER, this.orderId).toPromise();
      if(res['META']['status'] == "200"){
        this.order = res['DATA'];
        console.log(this.order);
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
