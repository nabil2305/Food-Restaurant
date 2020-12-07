import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from './components/order/order.model';
import { MenuItem } from './components/restaurants/restaurant-detail/menu-item/menu-item.model';
import { CartItem } from './components/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { RestaurantsService } from './components/restaurants/restaurants-json.service';

@Injectable({
  providedIn: 'root'
})
export class ReorderService {
  // reorder: Order = new Order('', 0, '', '', null, '');
  menuItem: MenuItem;
  //menu: MenuItem[];
  menu: any;
  items: CartItem[] = [];
  reorderCart: CartItem;
  reorder: any;


  constructor() { }
  viewdetails() {

    for (let i = 0; i < this.reorder.orderItems.length; i++) {

      for (let item of this.menu) {

        if (this.reorder.orderItems[i].menuId == item.id) {

          this.menuItem = item;

        }

      }

      const foundItem = this.items.find((mItem) => mItem.menuItem.id === this.menuItem.id);
      if (foundItem) {

        //this.increaseQtd(foundItem);

      } else {

        this.items.push(new CartItem(this.menuItem));

      }


      // this.reorderCart= new CartItem(this.menuItem, this.reorder.orderItems[i].quantity);

      // console.log('Check Service Objects:'+JSON.stringify(this.reorderCart));

      console.log('item array: ' + JSON.stringify(this.items));

      // console.log('Check Service Objects2:'+JSON.stringify(this.menuItem));    

    }

  }







  reordering() {
    for (let i = 0; i < this.reorder.orderItems.length; i++) {
      for (let item of this.menu) {
        if (this.reorder.orderItems[i].menuId == item.id) {
          this.menuItem = item;
        }
      }


      const foundItem = this.items.find((mItem) => mItem.menuItem.id === this.menuItem.id);

      if (foundItem) {
        this.increaseQtd(foundItem);
      } else {
        this.items.push(new CartItem(this.menuItem));
      }

      // this.reorderCart= new CartItem(this.menuItem, this.reorder.orderItems[i].quantity);
      // console.log('Check Service Objects:'+JSON.stringify(this.reorderCart));
      console.log('item array: ' + JSON.stringify(this.items));
      // console.log('Check Service Objects2:'+JSON.stringify(this.menuItem));

    }
  }

  increaseQtd(item: CartItem) {
    item.quantity = item.quantity + 1;
  }
}
