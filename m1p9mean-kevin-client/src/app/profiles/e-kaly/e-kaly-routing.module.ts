import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { EKalyComponent } from './e-kaly.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './management/management.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfitComponent } from './profit/profit.component';

const routes: Routes = [{
  path: '',
  component : EKalyComponent,
  children : [
    {
      path: "home",
      component: HomeComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "orders",
      component: OrdersComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "order/:orderId",
      component: OrderComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "profit",
      component: ProfitComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "management",
      component: ManagementComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EKalyRoutingModule { }
