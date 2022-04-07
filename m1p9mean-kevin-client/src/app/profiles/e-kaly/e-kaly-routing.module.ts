import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { EKalyComponent } from './e-kaly.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './management/management.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfitComponent } from './profit/profit.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

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
      path: "restaurant/:restaurantId",
      component: RestaurantComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "employee-form/:restaurantId",
      component: EmployeeFormComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: "restaurant-form",
      component: RestaurantFormComponent,
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
