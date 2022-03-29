import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
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
  constructor(private api : ApiService, private popupService : PopupService, private activatedRoute : ActivatedRoute) { }

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
}
