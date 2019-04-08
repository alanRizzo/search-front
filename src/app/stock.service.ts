import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoginService } from './login.service';
import { Item } from './stock/stock-item/stock-item.model';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  API_URL = 'http://localhost:8000/api/';

  private httpOptions: any;
  private token: string;
  public refreshItem: BehaviorSubject<boolean>;
  public refreshItem$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) {
    this.refreshItem = new BehaviorSubject<boolean>(false);
    this.refreshItem$ = this.refreshItem.asObservable();
    this.token = this.loginService.getToken();
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
      )
    };
  }
  getItems() {
    return this.http.get(`${this.API_URL}items/`, this.httpOptions);
  }

  getCategories() {
    return this.http.get(`${this.API_URL}categories`, this.httpOptions);
  }

  addItem(item: Item) {
    const body = {
      codigo: item.codigo,
      nombre: item.nombre,
      categoria: item.categoria,
      precio: item.precio,
      stock: item.stock
    };
    return this.http.post(`${this.API_URL}items/`, body, this.httpOptions);
  }

  editItem(id: number, item: Item) {
    const body = {
      codigo: item.codigo,
      nombre: item.nombre,
      categoria: item.categoria,
      precio: item.precio,
      stock: item.stock
    };
    return this.http.put(`${this.API_URL}items/${id}/`, body, this.httpOptions);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.API_URL}items/${id}/`, this.httpOptions);
  }

  searchItems(term: string) {
    return this.http.get(`${this.API_URL}items?search=${term}`, this.httpOptions);
  }
}
