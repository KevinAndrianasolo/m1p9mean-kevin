import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router : Router, private authService : AuthService){

  }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|boolean {
    return new Observable<boolean>((observer) => {
      setTimeout(async () => {
        let res = await this.authService.isAuthentificated();
        if(!res) this.router.navigate(["login"]);
        observer.next(res);
        observer.complete();
      });
    });
  }
}
