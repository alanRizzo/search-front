import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StockService } from '../../../stock.service';
import { Item } from '../stock-item.model';

@Component({
  selector: 'app-stock-edit-item',
  templateUrl: './stock-edit-item.component.html'
})
export class StockEditItemComponent implements OnInit {
  @Input() selectedItem: Item;
  editForm: FormGroup;
  categories: any;

  constructor(private fb: FormBuilder, private stockService: StockService) {}

  ngOnInit() {
    this.stockService
      .getCategories()
      .subscribe(
        data => (this.categories = data),
        error => console.log('error: ', error)
      );
    this.editForm = this.fb.group({
      categoria: [this.selectedItem.categoria, Validators.required],
      nombre: [this.selectedItem.nombre, Validators.required],
      codigo: [this.selectedItem.codigo, Validators.required],
      stock: [this.selectedItem.stock],
      precio: [this.selectedItem.precio]
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

  onEdit(item: Item) {
    console.log(item);
    this.stockService
      .editItem(this.selectedItem.id, item)
      .subscribe(
        data => {
          console.log('data: ', data);
          this.stockService.refreshItem.next(true);
        },
        error => console.log('error: ', error)
      );
  }

  onDelete() {
    this.stockService
      .deleteItem(this.selectedItem.id)
      .subscribe(
        data => {
          console.log('data: ', data);
          this.stockService.refreshItem.next(true);
        },
        error => console.log('error: ', error)
      );
  }
}
