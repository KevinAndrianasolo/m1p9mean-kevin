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
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute, private basketService : BasketService, private router : Router) { }

  async ngOnInit() {
    this.menuId = this.activatedRoute.snapshot.params['menuId'];
    await this.InitMenu();
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
    this.basketService.addToBasket(this.menu.restaurantId, {
      menuId : this.menu._id,
      quantity : this.quantity,
      cost : this.menu.unitPrice * this.quantity
    });
    this.popupService.showSuccess("Ajouté au panier");
    this.router.navigateByUrl(`/client/restaurant/${this.menu.restaurantId}`);
  }
}
