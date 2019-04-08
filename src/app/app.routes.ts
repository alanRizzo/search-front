import { Routes, RouterModule } from '@angular/router';

import { StockComponent } from './stock/stock.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
