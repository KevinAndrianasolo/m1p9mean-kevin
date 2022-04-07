import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/classes/Collections';
import { ApiService } from 'src/app/services/api/api.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public onLoading : boolean = false;
  public restaurants : any [] = [];
  constructor(private api : ApiService, private popupService : PopupService) { }

  async ngOnInit() {
    await this.InitRestaurants();
  }

  public async InitRestaurants(){
    try{
      this.onLoading = true;
      let res : any = await this.api.findAll(Collections.RESTAURANT).toPromise();
      if(res['META']['status'] == "200"){
        this.restaurants = res['DATA'];
        console.log(this.restaurants);
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
