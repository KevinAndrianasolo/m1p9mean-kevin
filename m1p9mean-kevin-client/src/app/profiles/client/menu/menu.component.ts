import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { BasketService } from 'src/app/services/basket/basket.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public onLoading : boolean = false;
  public menu : any  =  {};
  public menuId : number = -1;
  public quantity : number = 0;
  public isUpdate : boolean = false;
  public iItem : number = -1;
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute, private basketService : BasketService, private router : Router) { }

  async ngOnInit() {
    this.menuId = this.activatedRoute.snapshot.params['menuId'];
    await this.InitMenu();
    this.initBasket();
  }
  public initBasket(){
    let basket = this.basketService.getBasketOf(this.menu.restaurantId);
    if(basket){
      this.iItem = this.basketService.indexOf(basket.items, 'menuId', this.menuId);
      if(this.iItem !=-1){
        let basketItem = basket.items[this.iItem ];
        this.quantity = basketItem.quantity;
        this.isUpdate = true;
        console.log(basketItem);
      }
    }
  }
  public async InitMenu(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findById(Collections.MENU, this.menuId).toPromise();
      if(res['META']['status'] == "200"){
        this.menu = res['DATA'];
        console.log(this.menu);
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

  public decreaseQuantity(){
    if(this.quantity>0) this.quantity --;
  }
  public increaseQuantity(){
    this.quantity ++;
  }

  public addToBasket(){
    let item = {
      menuId : this.menu._id,
      quantity : this.quantity,
      cost : this.menu.unitPrice * this.quantity
    };

    if(this.isUpdate) {
      this.basketService.updateBasket(this.menu.restaurantId, this.iItem, item);
      this.router.navigateByUrl(`/client/basket`);
    }
    else{
      this.basketService.addToBasket(this.menu.restaurantId, item);
      this.router.navigateByUrl(`/client/restaurant/${this.menu.restaurantId}`);
    }
    
  }
  public deleteFromBasket(){
    this.basketService.deleteFromBasket(this.menu.restaurantId, this.iItem);
    this.router.navigateByUrl(`/client/basket`);
  }
}
