import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  
  public showSuccess(msg : string):void{
    let title = "Succès";
    let icon : SweetAlertIcon= "success";
    if(msg==null) msg = "Null pointer";
    Swal.fire(title, msg, icon);

  }
  public confirm(msg : string, confirmButtonText : string, cb_confirmed : any, cb_denied : any):void{
    let title = "Avertissement";
    let icon : SweetAlertIcon= "question";
    Swal.fire({
      icon: 'info',
      title: 'Avertissement',
      text: msg,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  reverseButtons: true
    }).then((res)=>{
      if(res.isConfirmed) cb_confirmed();
      else cb_denied();
    });

  }
  public showError(msg : string):void{
    let title = "Oops !";
    let icon : SweetAlertIcon= "warning";
    if(msg==null) msg = "Null pointer";
    Swal.fire(title, msg, icon);

  }
}
