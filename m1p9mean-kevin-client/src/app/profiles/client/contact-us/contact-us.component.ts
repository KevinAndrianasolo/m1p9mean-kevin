import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { MailService } from 'src/app/services/mail/mail.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public form : any = {
    recipient : "kevin.andrianasolo.lala@gmail.com"
  };
  public onLoading : boolean = false;
  constructor(private router : Router, private popupService : PopupService, private mailService : MailService) { }

  ngOnInit(): void {
  }
  public isValid(){
    return  this.form.recipient && this.form.subject && this.form.text 
    && this.form.recipient!="" && this.form.subject!="" && this.form.text!="" ;
  }

  public async formSubmit(){
    
    try{
      if(!this.isValid()) throw new Error('Veuillez vérifier le formulaire.');
      this.onLoading = true;
      let res : any = await this.mailService.sendMail(this.form).toPromise();
      console.log(this.form);
      if(res['META']['status'] == "200"){
        this.router.navigateByUrl('/client/home');   
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
