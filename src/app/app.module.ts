import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './extras/loading/loading.component';
import { StockEditItemComponent } from './stock/stock-item/stock-edit-item/stock-edit-item.component';
import { StockAddItemComponent } from './stock/stock-item/stock-add-item/stock-add-item.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockItemComponent,
    LoginComponent,
    LoadingComponent,
    StockEditItemComponent,
    StockAddItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000']
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
