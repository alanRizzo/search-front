import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StockService } from '../../../stock.service';
import { Item } from '../stock-item.model';

@Component({
  selector: 'app-stock-add-item',
  templateUrl: './stock-add-item.component.html'
})
export class StockAddItemComponent implements OnInit {
  items: Item[] = [];
  addForm: FormGroup;
  categories: any;

  constructor(private fb: FormBuilder, private stockService: StockService) { }

  ngOnInit() {
    this.stockService
      .getCategories()
      .subscribe(
        data => (this.categories = data),
        error => console.log('error: ', error)
      );
    // console.log(this.categories);

    this.addForm = this.fb.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      stock: [0], // not required
      precio: [0], // not required
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onAdd(item: Item) {
    this.stockService
      .addItem(item)
      .subscribe(
        data => {
          console.log('data: ', data);
          this.stockService.refreshItem.next(true);
        },
        error => console.log('error: ', error)
      );
  }
  onAddCancel() {
    this.addForm.reset();
  }
}
