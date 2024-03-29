import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { OrderState } from 'src/app/classes/OrderState';
import { ApiService } from 'src/app/services/api/api.service';
import { BasketService } from 'src/app/services/basket/basket.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public basket : any []= [];
  public onLoading : boolean = false;
  public basketItems : any[] =[];
  constructor(private api : ApiService, private storageService : StorageService, private popupService : PopupService, private router : Router, private basketService : BasketService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.basket = this.storageService.getBasket();
    
    this.InitBasketItems();
    console.log(this.basketItems);
  }
  public onDragLeave($event : DragEvent){
    $event.preventDefault();
    let element : any= $event.target;
    if(element){
      element.style['box-shadow'] = "none";
      element.style.color = "black";
    } 
  }
  public onDragOver($event : DragEvent){
    $event.preventDefault();
    let element : any= $event.target;
    if(element) {
      element.style['box-shadow'] = "0px 0px 20px red";
      element.style.color = "red";
    }
  }
  public onDragEnd($event : DragEvent){
    // $event.preventDefault();
    let element : any= $event.target;
    if(element) element.style.opacity = 1;
  }
  public onDragStart($event : DragEvent, basketItem : any){
    // $event.preventDefault();
    console.log(basketItem);
    let element : any= $event.target;
    if(element) element.style.opacity = 0.5;
    if($event.dataTransfer){
      $event.dataTransfer.effectAllowed = 'move';
      $event.dataTransfer.setData("text/plain", JSON.stringify({
        restaurantId : basketItem.restaurantId,
        menuId : basketItem.menuId,

      }));
    }
  }
  public handleDrop($event : DragEvent) {
    $event.preventDefault();
    if($event.dataTransfer){
      let tmp : string = $event.dataTransfer?.getData('text/plain');
      let basketItem = JSON.parse(tmp);
      let basket = this.basketService.getBasketOf(basketItem.restaurantId);
      if(basket){
        let iItem = this.basketService.indexOf(basket.items, 'menuId', basketItem.menuId);
        this.basketService.deleteFromBasket(basketItem.restaurantId, iItem);
        this.ngOnInit();
      }
    }
    let element : any= $event.target;
    if(element){
      element.style['box-shadow'] = "none";
      element.style.color = "black";
    } 
    
    return false;
  }

  public async InitBasketItems(){
    this.basketItems = [];
    for(let i=0; i<this.basket.length; i++){
      for(let j=0; j<this.basket[i].items.length; j++){
        let item = this.basket[i].items[j];
        item.menu = await this.getMenu(item.menuId);
        item.restaurantId = this.basket[i].restaurantId;
        this.basketItems.push(item);
      }
    }
  }
  public async getMenu(menuId : any){
    let res : any = await this.api.findById(Collections.MENU, menuId).toPromise();
      if(res['META']['status'] == "200"){
        let menu = res['DATA'];
        return menu;
      }
      else{
        throw new Error(res['META']['message']);
      }
  }
  public async saveOrders(){
    
    try{
      if(!this.storageService.getAccountToken()) throw new Error("Veuillez vous connecter pour continuer.");

      this.onLoading = true;
      let now = new Date();
      for(let i=0; i<this.basket.length; i++){
        this.basket[i]['orderStateId'] = OrderState.IN_PROGRESS;
        this.basket[i]['orderDate'] = now;
      }
      console.log(this.basket);
      let res : any = await this.api.saveAll(Collections.ORDER, this.basket , true).toPromise();
      if(res['META']['status'] == "200"){
        console.log(res['DATA']);
        this.storageService.resetBasket();
        this.router.navigateByUrl('/client/orders');
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
//   {
//     "userId" : "623c552838be7c619737b1b5",
//     "restaurantId" : "6242a1502597694c914ff9e3",
//     "orderStateId" : "6242a6c52597694c914ff9ea",
//     "orderDate" : new Date(),
//     "quantity" : 3,
//     "cost" : 16.90,
//     "items" : [
//         {
//             "menuId" : "6242a44b2597694c914ff9e6",
//             "quantity" : 2,
//             "cost" : 7
//         },
//         {
//             "menuId" : "6242a4532597694c914ff9e7",
//             "quantity" : 1,
//             "cost" : 9.90
//         }     
//     ]
// }

}
