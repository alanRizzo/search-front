import { Component, Input } from '@angular/core';

import { Item } from './stock-item.model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent {
  @Input() item: Item;
  selectedItem: Item;


  constructor() {
   }

  onSelectedItem(item: Item) {
    this.selectedItem = item;
  }
}
