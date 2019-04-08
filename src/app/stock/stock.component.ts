import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { StockService } from '../stock.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html'
})
export class StockComponent implements OnInit, DoCheck {
  items: any; // CAMBIAR A Item[]
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  refresh = false;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private loginService: LoginService) {
    this.stockService.refreshItem$.subscribe(x => this.refresh = x);
  }

  getItems() {
    this.stockService.getItems()
    .subscribe(
      data => this.items = data,
      error => console.log('error: ', error)
    );
  }

  ngOnInit() {
    this.searchForm = this.fb.group({search: ''});
    this.getItems();
  }

  ngDoCheck() {
    if (this.refresh) {
      this.getItems();
      this.refresh = false;
    }
  }

  onSearch() {
    const term = this.searchForm.get('search').value.toLowerCase();
    this.stockService.searchItems(term)
    .subscribe(
      data => this.items = data,
      error => console.log('error: ', error)
    );
  }

  onLogout() {
    this.loginService.logout();
  }
}
