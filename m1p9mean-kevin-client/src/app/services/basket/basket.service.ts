import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private storageService : StorageService) { }
  public indexOf(tab : any[], key : string, value : any){
    for(let i=0; i<tab.length; i++){
      if(tab[i][key] == value) return i;
    }
    return -1;
  }
  public getBasketOf(restaurantId : number){
    let basket : any []= this.storageService.getBasket();
    let iOrder = this.indexOf(basket, 'restaurantId', restaurantId);
    if(iOrder==-1) return null;
    return basket[iOrder];
  }
  public getTotal(tab : any[], key : string){
    let total = 0;
    for(let i=0; i<tab.length; i++){
      total += tab[i][key];
    }
    return total;
  }
  public deleteFromBasket(restaurantId : number, iItem : number){
    let basket : any []= this.storageService.getBasket();
    let iOrder = this.indexOf(basket, 'restaurantId', restaurantId);
    basket[iOrder].items.splice(iItem, 1);
    basket[iOrder].cost = this.getTotal(basket[iOrder].items, 'cost');
    basket[iOrder].quantity = this.getTotal(basket[iOrder].items, 'quantity');
    this.storageService.setBasket(basket);
  }
  public updateBasket(restaurantId : number, iItem : number, item : any){
    let basket : any []= this.storageService.getBasket();
    let iOrder = this.indexOf(basket, 'restaurantId', restaurantId);
    
    basket[iOrder].items[iItem] = item;
    basket[iOrder].cost = this.getTotal(basket[iOrder].items, 'cost');
    basket[iOrder].quantity = this.getTotal(basket[iOrder].items, 'quantity');
    this.storageService.setBasket(basket);
  }

  public addToBasket(restaurantId : number, item : never){
    if(!item) return;
    let basket : any []= this.storageService.getBasket();
    let iOrder = this.indexOf(basket, 'restaurantId', restaurantId);
    console.log(iOrder);
    let order = {
      restaurantId : restaurantId,
      items : [],
      cost : 0,
      quantity : 0
    };

    if(iOrder!=-1) {
      order = basket[iOrder];
      basket.splice(iOrder, 1); 
    }
    order.items.push(item);
    order.cost = this.getTotal(order.items, 'cost');
    order.quantity = this.getTotal(order.items, 'quantity');
    basket.push(order);
    
    this.storageService.setBasket(basket);
  }

}
