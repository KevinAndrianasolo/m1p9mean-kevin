import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "client",
    loadChildren: () => import('./profiles/client/client.module').then(m => m.ClientModule)
    
  },
  {
    path: "restaurant",
    loadChildren: () => import('./profiles/restaurant/restaurant.module').then(m => m.RestaurantModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: "delivery-man",
    loadChildren: () => import('./profiles/delivery-man/delivery-man.module').then(m => m.DeliveryManModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: "e-kaly",
    loadChildren: () => import('./profiles/e-kaly/e-kaly.module').then(m => m.EKalyModule),
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
